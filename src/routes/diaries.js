import express from "express";
import Diary from "../models/diaries.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// створення
router.post("/", auth, async (req, res) => {
  try {
    const { date, mood, note } = req.body;

    const diary = await Diary.create({
      date,
      mood,
      note,
      owner: req.user._id,
    });

    res.status(201).json(diary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// отримання
router.get("/", auth, async (req, res) => {
  try {
    const diaries = await Diary.find({ owner: req.user._id }).sort({
      date: -1,
    });

    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// редагування
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const diary = await Diary.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    res.json(diary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// видалення
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const diary = await Diary.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    res.json({ message: "Diary deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
