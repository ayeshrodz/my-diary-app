import { useState, useEffect } from "react";
import { addEntry, getAllEntries } from "./db";

function App() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const allEntries = await getAllEntries();
      setEntries(allEntries);
    };
    fetchEntries();
  }, []);

  const handleAddEntry = async () => {
    if (entry.trim()) {
      await addEntry(entry);
      setEntry("");
      const allEntries = await getAllEntries();
      setEntries(allEntries);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Diary</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your diary entry here..."
        ></textarea>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleAddEntry}
        >
          Add Entry
        </button>
        <div className="mt-6">
          {entries.map((e) => (
            <div key={e.id} className="mb-2 p-2 bg-gray-200 rounded">
              <p className="text-sm">{new Date(e.date).toLocaleString()}</p>
              <p>{e.entry}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
