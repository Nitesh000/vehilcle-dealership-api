import express from "express";
import "dotenv/config";
import cors from "cors";
import loginRouter from "./routes/userRotue";
import dealerRouter from "./routes/dealerRoute";
import adminRouter from "./routes/adminRoute";
// NOTE: And this line below for fake data insertion.
// import { insertAllData } from "./utils/createFakeData";

const app = express();
const port = process.env.BASE_PORT;

// NOTE: uncomment line below to add fake data to database.
// insertAllData();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", loginRouter);
app.use("/api/dealer", dealerRouter);
app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
