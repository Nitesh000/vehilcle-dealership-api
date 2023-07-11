import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByConstraints, findData } from "../utils/dbOperations";
import { checkToken } from "../middlewares/checkToken";

const router = Router();

router.post("/login", async (req, res) => {
  const { userMail, userPassword } = req.body;
  try {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(userPassword, salt);

    const user = await findByConstraints("user", { user_email: userMail });
    if (user.data == null)
      res.status(404).json({
        error: {
          message: "User not found",
          status: 404,
        },
      });
    // NOTE: check if the password id correct?
    else if (hashedPassword != user.data.password) {
      res.status(401).json({
        error: {
          message: "Invalid password",
          status: 401,
        },
      });
    }
    // NOTE: if the password is corrent, return the success message and a cookie.
    else {
      const token = jwt.sign({ id: user.data._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ result: "success", token: token, user: user.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: endpoints
// NOTE: to view all cars
router.get("/:id/all-vehicles", checkToken, async (req, res) => {
  try {
    const vehicles = await findByConstraints("cars");
    if (vehicles.data == null)
      res.status(404).json({
        error: {
          message: "Vehicles not found",
          status: 404,
        },
      });
    else {
      res.status(200).json({ result: "success", vehicles: vehicles.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: to view all cars in dealership
router.get("/:id/dealership-vehicles", checkToken, async (req, res) => {
  try {
    const dealershipVehicles = await findData("dealership", {}, { cars: 1 });
    if (dealershipVehicles.data == null)
      res.status(404).json({
        error: {
          message: "Vehicles not found",
          status: 404,
        },
      });
    else {
      res
        .status(200)
        .json({ result: "success", vehicles: dealershipVehicles.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: to view dealership for certain car
router.get("/:id/dealership/:carId", checkToken, async (req, res) => {
  try {
    const dealership = await findData("dealership", {
      cars: { $elemMatch: { _id: req.params.carId } },
    });
    if (dealership.data == null)
      res.status(404).json({
        error: {
          message: "Dealership not found",
          status: 404,
        },
      });
    else {
      res.status(200).json({ result: "success", dealership: dealership.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: to view al vehicles owned by user
router.get("/:id/my-vehicles", checkToken, async (req, res) => {
  try {
    const myVehicles = await findData(
      "user",
      { _id: req.params.id },
      { cars: 1 }
    );
    if (myVehicles.data == null)
      res.status(404).json({
        error: {
          message: "Vehicles not found",
          status: 404,
        },
      });
    else {
      res.status(200).json({ result: "success", vehicles: myVehicles.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: to view all deals on a certain car
router.get("/:id/deals/:carId", checkToken, async (req, res) => {
  try {
    const deals = await findData("deal", {
      car_id: req.params.carId,
    });
    if (deals.data == null)
      res.status(404).json({
        error: {
          message: "Deals not found",
          status: 404,
        },
      });
    else {
      res.status(200).json({ result: "success", deals: deals.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: to view all deals from a certain dealership
router.get("/:id/deals/:dealership-id", checkToken, async (req, res) => {
  try {
    const deals = await findData(
      "deal",
      {
        _id: req.params.dealershipId,
      },
      { deals: 1 }
    );
    const dealsOnThisDealership: any = [];
    Object.keys(deals.data).forEach((key) => {
      dealsOnThisDealership.push({ _id: deals.data[key] });
    });
    const allDeals = await findData("deal", {
      _id: { $in: dealsOnThisDealership },
    });
    if (allDeals.data == null)
      res.status(404).json({
        error: {
          message: "Deals not found",
          status: 404,
        },
      });
    else {
      res.status(200).json({ result: "success", deals: allDeals.data });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
});

// NOTE: allow a user to buy a car after a deal is made
// router.post("/:id/buy-car", checkToken, async (req, res) => {
//   try {

export default router;
