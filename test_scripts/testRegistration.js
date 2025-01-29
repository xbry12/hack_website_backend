const axios = require("axios");

const testRegistration = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/users/register",
      {
        username: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      }
    );
    console.log("Registration Response:", response.data);
  } catch (error) {
    console.error("Registration Error:", error.response.data);
  }
};

testRegistration();
