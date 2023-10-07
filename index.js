const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 8000;
const todoRoutes = require("./routes/Todo");

const app = express();
const uri =
  "mongodb+srv://sarimalikhan:sarimalikhan28@cluster0.qzv7var.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  //a .catch block to handle any errors that may occur during the database connection.
  .catch((error) => {
    console.error("ERROR CONNECTING TO DATABASE:", error);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api", todoRoutes);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
