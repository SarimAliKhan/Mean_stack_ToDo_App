const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login a user
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
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

  // const token = await generateJWTToken(user);
  res.status(200).json({ status: true, loggedIn: true });
});

// Generate a JWT token for the user
async function generateJWTToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "sarimak28",
    {
      algorithm: 'RS256',
      expiresIn: "1h",
    }, function(err, res) {
      console.log(res)
      console.log(err)
    }
  );

  return token;
}

module.exports = router;
