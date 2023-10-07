const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// to get all the todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// to get a single todo
router.get("/todo/:todoId", async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  res.json(todo);
});

// to create a new todo
router.post("/todo", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

// to update the todo
router.put("/todo/:todoId", async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  todo.set(req.body);
  await todo.save();
  res.json(todo);
});

// to delete the todo
router.delete("/todo/:todoId", async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  await todo.delete();
  res.sendStatus(204);
});

module.exports = router;
