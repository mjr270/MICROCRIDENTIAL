import React, { useState } from "react";

const Verify = () => {
  const [docID, setDocID] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    // Mock verification logic
    if (docID === "12345") {
      setResult({ status: "Verified", owner: "John Doe", date: "2025-10-10" });
    } else {
      setResult({ status: "Not Verified" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Verify Document</h1>

      <form onSubmit={handleVerify} className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Document ID"
          value={docID}
          onChange={(e) => setDocID(e.target.value)}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </form>

      {result && (
        <div className="bg-white p-4 rounded shadow">
          {result.status === "Verified" ? (
            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                Document Verified ✅
              </h2>
              <p><strong>Owner:</strong> {result.owner}</p>
              <p><strong>Date Issued:</strong> {result.date}</p>
            </div>
          ) : (
            <h2 className="text-2xl font-semibold text-red-600">
              Document Not Verified ❌
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
