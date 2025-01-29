const axios = require("axios");

const testLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5001/api/users/login", {
      email: "johndoe@example.com", // Use the email you registered
      password: "password123", // Use the password you registered with
    });
    console.log("Login Response:", response.data);
  } catch (error) {
    console.error("Login Error:", error.response.data);
  }
};

testLogin();
