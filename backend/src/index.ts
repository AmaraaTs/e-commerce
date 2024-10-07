import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { Resend } from "resend";

dotenv.config();

import authRoute from "./routes/auth-route";
import categoryRoute from "./routes/category-route";
import productRoute from "./routes/product-route";
import savedRoute from "./routes/saved-route";
import cartRoute from "./routes/cart-route";

import { connectDB } from "./config/db";
import { generateHtmlTemplate } from "./utils/generateHtmlTemplate";
import { sendEmail } from "./utils/send-email";

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

//express ees application object vvsgeh
const app = express();
// const resend = new Resend(process.env.RESEND_API_KEY);

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/saved", savedRoute);
app.use("/api/v1/cart", cartRoute);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome E-commerce API Server");
});

connectDB(MONGO_URI);

//server asaah
app.listen(PORT, () => {
  console.log(`Server localhost:${PORT} running!`);
});

// MONGOOSE framework san => ODM - Object data mapping
