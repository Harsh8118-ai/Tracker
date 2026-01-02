import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* CREATE USER */
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
    res.status(500).json(err);
  }
});

/* GET USERS (search + filter + date) */
router.get("/", async (req, res) => {
  const { search, from, to } = req.query;

  let query = {};

  if (search) {
    query.username = { $regex: search, $options: "i" };
  }

  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }

  const users = await User.find(query).sort({ createdAt: -1 });
  res.json(users);
});

export default router;
