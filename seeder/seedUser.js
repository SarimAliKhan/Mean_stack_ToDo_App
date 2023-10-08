const User = require("../models/User");
const bcrypt = require("bcrypt");
const connectToDatabase = require("../dbConnection"); // Import the database connection function


connectToDatabase()
// Use the async function to generate the hashed password

const createUser = async () => {
    try {
      // Generate a hashed password
      const hashedPassword = await bcrypt.hash("sarimak28", 10);
  
      // Create a new User instance with the hashed password
      
      const user = new User({
        username: "sarimkhan",
        password: hashedPassword, // Use the hashed password here
      });
      console.log(user)
      // Save the user to the database
      await user.save();
      console.log("hey")
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  createUser()