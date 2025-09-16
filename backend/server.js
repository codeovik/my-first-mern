import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import cors from "cors";
import { frontendUrl } from "./control.js";

dotenv.config({ debug: false });

const app = express();
app.use(express.json()); // JSON body parse করার জন্য

// Middleware
app.use(cors({
  origin: frontendUrl,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// POST: নতুন product add করা
app.post("/api/products", async (req, res) => {
  try {
    const { name, imageLink, price } = req.body;
    const newProduct = new Product({ name, imageLink, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// GET: সব product দেখা
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// DELETE: product delete by id
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted: " + req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, imageLink, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, imageLink, price },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Server start
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});