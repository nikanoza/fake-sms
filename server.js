import bodyParser from "body-parser";
import express from "express";
import { Vonage } from "@vonage/server-sdk";
import dotenv from "dotenv";
import swaggerMiddleware from "./swagger-middleware.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.post("/api/sms", async (req, res) => {
  const { to, text } = req.body;
  const from = "Vonage APIs";

  const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });
  try {
    const response = await vonage.sms.send({ to, from, text });
    console.log(response);
  } catch (error) {
    console.log("There was an error sending the messages.");
    console.error(error);
  }
});
app.use("/api", swaggerMiddleware());

app.listen(process.env.PORT || 3000);
