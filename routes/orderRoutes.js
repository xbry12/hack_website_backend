const axios = require("axios");
const Order = require("../models/Order"); // Assuming you have an Order model
const express = require("express");
const router = express.Router();

router.post("/orders", async (req, res) => {
  const userId = "60b7e8d0f1e0f81f89f4b5a7"; // Hardcoded user ID for now
  const { products } = req.body;

  // Validate products
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  // Ensure each product has productId and quantity
  for (const product of products) {
    if (!product.productId || !product.quantity) {
      return res
        .status(400)
        .json({ message: "Each product must have a productId and quantity" });
    }
  }

  let totalPrice = 0;

  try {
    // Log the incoming products for debugging
    console.log("Incoming products:", products);

    // Fetch product data from Fake Store API
    const productIds = products.map((product) => product.productId);
    const response = await axios.get("https://fakestoreapi.com/products", {
      params: { ids: productIds.join(",") },
    });

    // Log the response from Fake Store API for debugging
    console.log("Fake Store API Response:", response.data);

    // Calculate total price using the price from Fake Store API and the quantity from the request
    response.data.forEach((product) => {
      const orderedProduct = products.find((p) => p.productId === product.id);

      // Log the current product being processed
      console.log(`Processing product: ${product.id}, ${product.title}`);

      // Ensure we found the corresponding product in the order request
      if (orderedProduct) {
        totalPrice += product.price * orderedProduct.quantity;
      } else {
        console.log(`Product ID ${product.id} not found in order request`);
      }
    });

    // Create and save the order
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

module.exports = Order;
