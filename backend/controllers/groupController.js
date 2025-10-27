const { pool } = require("../config/db");

// Get all groups
const getGroups = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM groups ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new group (Admin only)
const createGroup = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO groups (name, description) VALUES ($1,$2) RETURNING *",
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getGroups, createGroup };
