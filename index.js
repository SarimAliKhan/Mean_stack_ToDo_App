const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 8000;
const todoRouter = require("./routes/Todo");
const loginRouter = require("./routes/login");

const app = express();
const connectToDatabase = require("./dbConnection");

// Connect to the database
connectToDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", todoRouter);
app.use("/user", loginRouter);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
