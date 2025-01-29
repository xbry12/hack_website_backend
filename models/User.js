const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // For password hashing

// 1. name, email, and password are the fields of the user.
// 2. bcryptjs is used to securely hash the password before saving it to the database.
// 3. pre('save') ensures that the password is hashed before saving the user in MongoDB.
// 4. matchPassword is a method to check if the entered password matches the hashed password stored in the database.

// What is bcryptjs?
// bcryptjs is a JavaScript library used for hashing passwords and comparing password hashes.

// - Why Do We Need It?
// When users sign up or log in, we don't store their plain text password in the database because it’s not secure.
// Instead, we hash the password before storing it. Hashing is a one-way process that turns the password
// into a long string of characters.

// bcryptjs helps us:

// Hash passwords (transform plain text passwords into hashed versions).
// Compare passwords (check if the entered password matches the hashed password stored in the database).

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password
  const salt = await bcrypt.genSalt(10); // Generate a salt (random data added to the password)
  this.password = await bcrypt.hash(this.password, salt); // Hash the password using the salt
  next();
});

// Method to compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt.compare() compares the entered password with the hashed password stored in the database.
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the stored hash
  //
};

const User = mongoose.model("User", userSchema);

module.exports = User;
