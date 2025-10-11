import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { getDocs, deleteDoc, verifyDoc } from "../utils/storage";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2, FileText, Trash2, Eye, ShieldCheck } from "lucide-react";

export default function DocumentList() {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      const all = await getDocs();
      if (!user) {
        setDocs([]);
        setLoading(false);
        return;
      }

      if (user.role === "Admin") setDocs(all);
      else
        setDocs(
          all.filter((d) => d.owner === user.email || d.owner === user.role)
        );
      setLoading(false);
    };
    fetchDocs();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    await deleteDoc(id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleVerify = async (id) => {
    await verifyDoc(id);
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "verified" } : d))
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Document Repository
        </h2>
        {user && (
          <Link
            to="/upload"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition"
          >
            Upload New
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
        </div>
      ) : docs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 text-center py-10 rounded-lg shadow">
          <FileText className="mx-auto w-10 h-10 text-gray-400" />
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            No documents found.
          </p>
          <Link
            to="/upload"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Upload Your First Document
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between transition hover:shadow-lg"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                  {doc.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Uploaded: {new Date(doc.createdAt).toLocaleString()}
                </span>
                <span className="mt-1 text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      doc.status === "verified"
                        ? "text-green-600 dark:text-green-400"
                        : doc.status === "pending"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-gray-500"
                    }`}
                  >
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </span>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0">
                {doc.dataUrl && (
                  <a
                    href={doc.dataUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                  >
                    <Eye size={16} /> View
                  </a>
                )}

                {/* Admin Actions */}
                {user?.role === "Admin" && doc.status !== "verified" && (
                  <button
                    onClick={() => handleVerify(doc.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                  >
                    <ShieldCheck size={16} /> Verify
                  </button>
                )}

                {/* Delete Button (Owner or Admin) */}
                {(user?.role === "Admin" || doc.owner === user.email) && (
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
