const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// ✅ Create group
router.post("/create", async (req, res) => {
  const { groupName, userId } = req.body;
  try {
    const groupResult = await pool.query("INSERT INTO groups (name) VALUES ($1) RETURNING id", [groupName]);
    const groupId = groupResult.rows[0].id;

    // Add creator as group member
    await pool.query("INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)", [groupId, userId]);

    res.status(201).json({ groupId, message: "Group created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating group" });
  }
});

// ✅ Add member to group
router.post("/add-member", async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    await pool.query("INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)", [groupId, userId]);
    res.json({ message: "Member added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding member" });
  }
});

module.exports = router;
