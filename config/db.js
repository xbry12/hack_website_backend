// What This Does:
// Connects to MongoDB using the MONGO_URI from .env
// Prints a success message if connected, otherwise exits with an error

// Pseudocode:
// Import the Mongoose library (which allows us to talk to MongoDB).
// Use Mongoose to connect to the database.
// If the connection is successful, log a message.
// If the connection fails, print an error and exit the program.
// Export the function so we can use it in other parts of our app.
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDatabase;
