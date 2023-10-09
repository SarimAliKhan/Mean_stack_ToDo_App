const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Login a user
router.post("/login", async (req, res) => {
  console.log('hello')
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password)
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "Invalid username" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }
  console.log(token)
  const token = await generateJWTToken(user);
  res.status(200).json({ token });
});

// Generate a JWT token for the user
async function generateJWTToken(user) {
  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, "Sarimak28", {
    expiresIn: "1h",
  });

  return token;
}

module.exports = router;
