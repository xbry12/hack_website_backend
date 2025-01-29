const express = require("express");
const axios = require("axios");

const router = express.Router();

// 🔹 GET all products from Fake Store API
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data); // Send product data to frontend
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 🔹 GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

module.exports = router;
