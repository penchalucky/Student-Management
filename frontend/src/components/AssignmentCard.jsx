import ProgressBar from "./ProgressBar";

export default function AssignmentCard({ assignment, onConfirm }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{assignment.title}</h2>
      <p>{assignment.description}</p>
      <p className="text-gray-500 mt-1">
        Due: {new Date(assignment.due_date).toLocaleDateString()}
      </p>
      <a
        href={assignment.onedrive_link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 mt-2 inline-block"
      >
        Submit Assignment
      </a>
      {onConfirm && (
        <button
          onClick={() => onConfirm(assignment.id)}
          className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Submission
        </button>
      )}
      {assignment.progress && <ProgressBar progress={assignment.progress} />}
    </div>
  );
}
