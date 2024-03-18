const express = require("express");
const router = express.Router();
const Todo = require("../../Models/Todos/Todo");

router.post("/add", async (req, res) => {
  try {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
      date: req.body.date,
      userId: req.body.userId,
      priority: req.body.priority,
    };
    const newTodo = new Todo(todo);
    await newTodo.save();
    res.send({ newTodo, success: true });
  } catch (err) {
    res.send(err);
  }
});

router.get("/get-todo-by-userId", async (req, res) => {
  try {
    const userId = req.query.userId;
    const result = await Todo.find({ userId: userId }).sort({ createdAt: -1 });
    res.send({ result, success: true });
  } catch (err) {
    res.send(err);
  }
});

router.post("/delete-todo", async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const result = await Todo.findByIdAndDelete(todoId);
    res.send({ result, success: true });
  } catch (err) {
    res.send(err);
  }
});

router.put("/update-todo", async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const updatedTodo = {
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
      completed: req.body.completed,
      date: req.body.date,
      priority: req.body.priority,
    };
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo);
    res.send({ result, success: true });
  } catch (err) {
    res.send(err);
  }
});

router.put("/complete-todo", async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const completed = req.body.completed;

    const result = await Todo.findByIdAndUpdate(todoId, {
      completed: completed,
    });
    res.send({ result, success: true });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
