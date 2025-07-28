import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

dotenv.config()

const app = express()
console.log(process.env.NONGO_URI)

app.post("/products",async (req,res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all required fields" });
    }
    const newProduct = new Product(product);
    try{
      await newProduct.save();
      catch (error) {
        return res.status(500).json({success: false, message: error.message});
      }
      res.status(201).json({success: true, data: newProduct});
    }
})


app.listen(3000, () => {
    connectDB()
  console.log("Server is running at http://localhost:3000 hello")
})