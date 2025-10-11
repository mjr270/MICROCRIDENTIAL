import React, { useMemo } from "react";
import DocumentList from "../../components/DocumentList";
import { getDocs } from "../../utils/storage";

export default function InstitutionDashboard() {
  const allDocs = getDocs();
  const institutionDocs = useMemo(
    () => allDocs.filter((d) => d.owner === "Institution"), // replace with dynamic check if needed
    [allDocs]
  );

  const totalDocs = institutionDocs.length;
  const verifiedDocs = institutionDocs.filter((d) => d.status === "verified").length;
  const pendingDocs = institutionDocs.filter((d) => d.status !== "verified").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Institution Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage and track documents issued by your institution.
        </p>

        {/* Quick Stats */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex-1 min-w-[150px] text-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Total Documents</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {totalDocs}
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow flex-1 min-w-[150px] text-center">
            <div className="text-green-800 dark:text-green-300 text-sm">Verified</div>
            <div className="text-xl font-semibold text-green-900 dark:text-green-100">
              {verifiedDocs}
            </div>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow flex-1 min-w-[150px] text-center">
            <div className="text-yellow-800 dark:text-yellow-300 text-sm">Pending</div>
            <div className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">
              {pendingDocs}
            </div>
          </div>
        </div>
      </div>

      {/* Document List Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Documents
        </h2>
        <DocumentList />
      </div>
    </div>
  );
}
