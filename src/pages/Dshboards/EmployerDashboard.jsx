import React, { useMemo } from "react";
import { getDocs } from "../../utils/storage";

export default function EmployerDashboard() {
  const allDocs = getDocs();
  const verifiedDocs = useMemo(
    () => allDocs.filter((d) => d.status === "verified"),
    [allDocs]
  );

  const totalVerified = verifiedDocs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Employer Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View all verified credentials uploaded by learners and institutions.
        </p>

        {/* Quick Stats */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex-1 min-w-[150px] text-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Verified Documents</div>
            <div className="text-xl font-semibold text-green-600 dark:text-green-400">
              {totalVerified}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Documents Section */}
      <div className="space-y-4">
        {verifiedDocs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No verified documents yet.
          </p>
        ) : (
          verifiedDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-100">
                  {doc.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {doc.owner} • {new Date(doc.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-green-600 dark:text-green-400 font-medium">
                Verified
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
