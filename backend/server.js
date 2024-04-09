import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import main from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
const app = express();
main();

app.use(express.json());
dotenv.config();
app.use(errorHandler);
const port = process.env.PORT || 2000;
app.use(cookieParser());

app.use("/api/getcontacts", contactRoutes);
app.use("/api/getusers", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
