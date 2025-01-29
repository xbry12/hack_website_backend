// require is a built-in function in Node.js that is used to import modules
// (files, libraries, or packages) into your code.
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db"); // Import database configuration.
const productRoutes = require("./routes/productRoutes"); // Import product routes.
const userRoutes = require("./routes/userRoutes"); // Import user routes.

dotenv.config(); // Load .env variables
connectDatabase(); // Connect to MongoDB

// What is app.use()?
// Yes, app.use() is a built-in function in Express.js that is used to apply middleware and define routes.
// Think of app.use() as a way to tell your server:
// "Whenever a request comes in that matches this path, run this function (or use this router)."

const app = express(); // Creates an express application.
app.use(express.json());

// Use Product Routes
// Whenever a request starts with /api/products, use productRoutes to handle it.
app.use("/api/products", productRoutes);

// For user registration/login
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use PORT from .env
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
