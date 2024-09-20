import { useState, useEffect } from "react";
import { addEntry, getAllEntries } from "./db";

// Define the interface for a diary entry
interface DiaryEntry {
  id?: number;
  date: string;
  entry: string;
}

function App() {
  // Set the type for the `entries` state to be an array of `DiaryEntry`
  const [entry, setEntry] = useState<string>("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

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
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Diary
        </h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your diary entry here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleAddEntry}
        >
          Add Entry
        </button>
        <div className="mt-6">
          {entries.map((e) => (
            <div
              key={e.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <p className="text-xs text-gray-500">
                {new Date(e.date).toLocaleString()}
              </p>
              <p className="text-gray-800">{e.entry}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
