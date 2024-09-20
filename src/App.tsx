import { useState, useEffect } from "react";
import { addEntry, getAllEntries, deleteEntry } from "./db"; // Make sure to import deleteEntry

// Define the interface for a diary entry, now including 'title'
interface DiaryEntry {
  id?: number;
  title: string;
  date: string;
  entry: string;
}

// Custom event type for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function App() {
  // State for diary inputs
  const [title, setTitle] = useState<string>(""); // Title input
  const [entry, setEntry] = useState<string>(""); // Entry input
  const [entries, setEntries] = useState<DiaryEntry[]>([]); // All entries
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null); // Selected entry for viewing
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null); // For install prompt

  useEffect(() => {
    const fetchEntries = async () => {
      const allEntries = await getAllEntries();
      // Sort entries by date (latest on top)
      const sortedEntries = allEntries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(sortedEntries);
    };
    fetchEntries();
  }, []);

  // Handle the PWA install button event
  useEffect(() => {
    const handler = (e: any) => {
      // Cast event as any
      console.log("beforeinstallprompt event fired");
      e.preventDefault(); // Prevent the mini-info bar from appearing
      setDeferredPrompt(e); // Stash the event for later use
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  // Add a new entry
  const handleAddEntry = async () => {
    if (title.trim() && entry.trim()) {
      await addEntry({ title, entry });
      setTitle("");
      setEntry("");
      const allEntries = await getAllEntries();
      const sortedEntries = allEntries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(sortedEntries); // Sort after adding a new entry
    }
  };

  // Handle clicking on an entry to view the full post
  const handleEntryClick = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
  };

  // Handle deleting an entry
  const handleDeleteEntry = async (id: number) => {
    await deleteEntry(id); // Delete the entry from the database
    const allEntries = await getAllEntries();
    const sortedEntries = allEntries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(sortedEntries); // Update the entries after deletion
  };

  // Handle PWA install
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the deferred prompt after use
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="container mx-auto p-4">
        {/* If an entry is selected, show the full post */}
        {selectedEntry ? (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedEntry.title}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {new Date(selectedEntry.date).toLocaleString()}
            </p>
            <p className="text-gray-800 mb-4">{selectedEntry.entry}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedEntry(null)} // Back to entries list
            >
              Back to Entries
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
              Diary
            </h1>
            {/* Input for title */}
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* Textarea for post */}
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

            {/* Install Button */}
            {deferredPrompt && (
              <button
                className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 transition mt-4"
                onClick={handleInstallClick}
              >
                Install App
              </button>
            )}

            {/* List of entries */}
            <div className="mt-6">
              {entries.length > 0 ? (
                entries.map((e) => (
                  <div
                    key={e.id}
                    className="relative mb-4 p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => handleEntryClick(e)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {e.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(e.date).toLocaleString()}
                    </p>
                    <p className="text-gray-600 truncate">
                      {e.entry.substring(0, 100)}...
                    </p>
                    {/* Delete Button */}
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent triggering the click event for viewing
                        handleDeleteEntry(e.id!);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No entries yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
