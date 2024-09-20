// src/db.ts
import { openDB } from "idb";

interface DiaryEntry {
  id?: number;
  date: string;
  entry: string;
}

const dbPromise = openDB("diary-db", 1, {
  upgrade(db) {
    db.createObjectStore("diaryEntries", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

export const addEntry = async (entry: string): Promise<void> => {
  const db = await dbPromise;
  await db.add("diaryEntries", { date: new Date().toISOString(), entry });
};

export const getAllEntries = async (): Promise<DiaryEntry[]> => {
  const db = await dbPromise;
  return db.getAll("diaryEntries");
};
