const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// ✅ Get all assignments
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM assignments ORDER BY due_date ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching assignments" });
  }
});

// ✅ Create new assignment (Admin only)
router.post("/", async (req, res) => {
  const { title, description, due_date, onedrive_link } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO assignments (title, description, due_date, onedrive_link) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, due_date, onedrive_link]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating assignment" });
  }
});

module.exports = router;
