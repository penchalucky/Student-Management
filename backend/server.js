const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const groupRoutes = require("./routes/groupRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
