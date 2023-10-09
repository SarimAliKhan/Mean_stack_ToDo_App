const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
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

  res.status(200).json({ status: true, loggedIn: true });
});


module.exports = router;
