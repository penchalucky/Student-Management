const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// ✅ Confirm submission
router.post("/confirm", async (req, res) => {
  const { groupId, assignmentId } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO submissions (group_id, assignment_id, confirmed) VALUES ($1,$2,true) RETURNING *",
      [groupId, assignmentId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error confirming submission" });
  }
});

// ✅ View all submissions (Admin view)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, g.name AS group_name, a.title AS assignment_title, s.confirmed
      FROM submissions s
      JOIN groups g ON s.group_id = g.id
      JOIN assignments a ON s.assignment_id = a.id
      ORDER BY s.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

module.exports = router;
