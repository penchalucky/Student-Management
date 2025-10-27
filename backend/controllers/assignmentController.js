const { pool } = require("../config/db");

// Get all assignments
const getAssignments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM assignments ORDER BY due_date ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new assignment
const createAssignment = async (req, res) => {
  const { title, description, due_date, onedrive_link } = req.body;

  if (!title || !description || !due_date || !onedrive_link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO assignments (title, description, due_date, onedrive_link) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, due_date, onedrive_link]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAssignments, createAssignment };
