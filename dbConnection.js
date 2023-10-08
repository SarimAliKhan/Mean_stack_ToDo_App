const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const uri =
      "mongodb+srv://sarimalikhan:sarimalikhan28@cluster0.qzv7var.mongodb.net/?retryWrites=true&w=majority";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDatabase;
