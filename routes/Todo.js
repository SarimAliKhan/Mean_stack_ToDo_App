const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/todos/getAll", async(req, res) => {
    const todoItem = await Todo.find();
    res.json(todoItem);
})

// Create a new todo item
router.post("/todos/save", async (req, res) => {
  const todoItem = new Todo(req.body);
  await todoItem.save();

  res.status(201).json(todoItem);
});

// Mark a todo item as done 
router.put("/todos/:todoId", async (req, res) => {
  const todoItem = await Todo.findById(req.params.todoId);
  if (!todoItem) {
    res.status(404).json({ message: "Todo item not found" });
    return;
  }

  todoItem.isDone = true;
  await todoItem.save();

  res.status(200).json({"isDone":todoItem.isDone});
});

// Delete a todo item
router.delete("/todos/delete/:todoId", async (req, res) => {
  const todoItem = await Todo.findById(req.params.todoId);
  if (!todoItem) {
    res.status(404).json({ message: "Todo item not found" });
    return;
  }

  await todoItem.deleteOne();

  res.sendStatus(200)
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
  
    const token = await generateJWTToken(user);
    res.status(200).json({ token });
  });
  

module.exports = router;
