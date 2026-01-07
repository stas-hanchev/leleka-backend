import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user._id });

    const safeTask = {
      id: task._id,
      name: task.name,
      date: task.date,
      isDone: task.isDone,
    };

    res.status(201).json({ data: safeTask });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ date: 1 });

    const safeTasks = tasks.map(task => ({
      id: task._id,
      name: task.name,
      date: task.date,
      isDone: task.isDone,
    }));

    res.status(200).json({ data: safeTasks });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { isDone } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isDone },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const safeTask = {
      id: task._id,
      name: task.name,
      date: task.date,
      isDone: task.isDone,
    };

    res.status(200).json({ data: safeTask });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

