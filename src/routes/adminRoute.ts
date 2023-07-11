import { Router } from "express";
import bcrypt from "bcrypt";
import { findByConstraints } from "../utils/dbOperations";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  const { userMail, userPassword } = req.body;
  try {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(userPassword, salt);

    const user = await findByConstraints("admin", { user_email: userMail });
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

export default router;
