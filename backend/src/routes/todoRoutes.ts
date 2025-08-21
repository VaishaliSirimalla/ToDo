import { Router } from "express";
import Todo from "../models/todoModel";

const router = Router();

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: "Failed to create todo" });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 3;
  try {
    const totalTodos = await Todo.countDocuments(); // total count
    const totalPages = Math.ceil(totalTodos / limit);

    const todos = await Todo.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ todos, totalPages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Update todo by id
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: "Failed to update todo" });
  }
});

// Delete todo by id
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;
