import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAssignments, confirmSubmission } from "../api";

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await getAssignments();
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  const handleConfirm = async (assignmentId) => {
    await confirmSubmission(assignmentId);
    alert("Submission confirmed!");
  };

  return (
    <div>
      <Navbar role="student" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((a) => (
          <div key={a.id} className="p-4 bg-white shadow-md rounded">
            <h3 className="font-bold text-lg">{a.title}</h3>
            <p>{a.description}</p>
            <p className="text-sm text-gray-500">Due: {a.due_date}</p>
            <a href={a.onedrive_link} target="_blank" rel="noreferrer" className="text-blue-600 underline block my-2">
              OneDrive Link
            </a>
            <button
              onClick={() => handleConfirm(a.id)}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Yes, I have submitted
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
