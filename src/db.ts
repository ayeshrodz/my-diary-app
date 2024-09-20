import { openDB } from "idb";

// Define the interface for a diary entry, now including 'title'
interface DiaryEntry {
  id?: number;
  date: string;
  title: string; // New title field
  entry: string;
}

const dbPromise = openDB("diary-db", 1, {
  upgrade(db) {
    // Creating the object store for diary entries
    db.createObjectStore("diaryEntries", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

// Function to add a new entry with both title and entry fields
export const addEntry = async (entryData: {
  title: string;
  entry: string;
}): Promise<void> => {
  const db = await dbPromise;
  await db.add("diaryEntries", {
    date: new Date().toISOString(),
    title: entryData.title, // Saving the title
    entry: entryData.entry, // Saving the entry
  });
};

// Function to get all entries from the database
export const getAllEntries = async (): Promise<DiaryEntry[]> => {
  const db = await dbPromise;
  return db.getAll("diaryEntries");
};

// Function to delete an entry from the database
export const deleteEntry = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.delete("diaryEntries", id); // Deleting the entry by id
};
