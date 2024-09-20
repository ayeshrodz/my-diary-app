// src/db.js
import { openDB } from "idb";

const dbPromise = openDB("diary-db", 1, {
  upgrade(db) {
    db.createObjectStore("diaryEntries", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

export const addEntry = async (entry) => {
  const db = await dbPromise;
  return db.add("diaryEntries", { date: new Date().toISOString(), entry });
};

export const getAllEntries = async () => {
  const db = await dbPromise;
  return db.getAll("diaryEntries");
};
