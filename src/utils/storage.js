// src/utils/storage.js

const STORAGE_KEY = "docs";

// Get all documents
export const getDocs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    console.error("Failed to parse docs from localStorage:", e);
    return [];
  }
};

// Save all documents
export const saveDocs = (docs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
};

// Save or update a single document
export const saveDoc = (doc) => {
  const all = getDocs();
  const idx = all.findIndex((d) => d.id === doc.id);
  if (idx >= 0) {
    all[idx] = doc; // update
  } else {
    all.unshift(doc); // add new at the start
  }
  saveDocs(all);
};

// Delete a document by id
export const deleteDoc = (id) => {
  const all = getDocs().filter((d) => d.id !== id);
  saveDocs(all);
};

// Mark a document as verified
export const verifyDoc = (id) => {
  const all = getDocs().map((d) =>
    d.id === id ? { ...d, status: "verified" } : d
  );
  saveDocs(all);
};
