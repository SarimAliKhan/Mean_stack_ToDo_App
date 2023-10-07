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

  res.status(200).json(todoItem);
});

// Delete a todo item
router.delete("/todos/:todoId", async (req, res) => {
  const todoItem = await Todo.findById(req.params.todoId);
  if (!todoItem) {
    res.status(404).json({ message: "Todo item not found" });
    return;
  }

  await todoItem.delete();

  res.sendStatus(204);
});

module.exports = router;
