import { useState, useEffect } from "react";
import { getAssignments, createAssignment } from "../api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    due_date: "",
    onedrive_link: ""
  });

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    const data = await getAssignments();
    setAssignments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAssignment(newAssignment);
    setNewAssignment({ title: "", description: "", due_date: "", onedrive_link: "" });
    loadAssignments();
    alert("Assignment created successfully!");
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
          <input
            type="text"
            placeholder="Title"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
            required
          ></textarea>
          <input
            type="date"
            value={newAssignment.due_date}
            onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="OneDrive Link"
            value={newAssignment.onedrive_link}
            onChange={(e) => setNewAssignment({ ...newAssignment, onedrive_link: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
          />
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Create Assignment
          </button>
        </form>

        <h2 className="text-xl font-bold mb-3">All Assignments</h2>
        <ul>
          {assignments.map((a) => (
            <li key={a.id} className="p-3 bg-gray-100 rounded mb-2">
              <strong>{a.title}</strong> - Due: {a.due_date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
