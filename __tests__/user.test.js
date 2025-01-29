const bcrypt = require("bcryptjs");
const { matchPassword } = require("../utils/userUtils"); // Assuming you have this function

test("should hash and match password", async () => {
  const password = "password123";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Compare password
  const isMatch = await matchPassword(password, hashedPassword);
  expect(isMatch).toBe(true);
});
