import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import Product from "./Models/products.model.js";
import mongoose from "mongoose";

dotenv.config()

const app = express()
console.log(process.env.NONGO_URI);





app.listen(3000, () => {
    connectDB()
  console.log("Server is running at http://localhost:3000 hello")
})