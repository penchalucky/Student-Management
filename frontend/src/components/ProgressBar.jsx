export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded h-4">
      <div
        className="bg-green-500 h-4 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
