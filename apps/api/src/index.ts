import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO || " ";
mongoose.connect(MONGO_URI).then(() => {
  console.log("~ Connected to Database ~");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});