import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { getDocs, deleteDoc, verifyDoc } from "../utils/storage";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2, FileText, Trash2, Eye, ShieldCheck } from "lucide-react";
import "../Style/DocumentList.css";

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
    <div className="document-list-container">
      <div className="document-list-header">
        <h2 className="document-list-title">
          Document Repository
        </h2>
        {user && (
          <Link
            to="/upload"
            className="upload-new-btn"
          >
            Upload New
          </Link>
        )}
      </div>

      {loading ? (
        <div className="loading-spinner">
          <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
        </div>
      ) : docs.length === 0 ? (
        <div className="empty-state">
          <FileText className="empty-state-icon" />
          <p className="empty-state-text">
            No documents found.
          </p>
          <Link
            to="/upload"
            className="upload-first-btn"
          >
            Upload Your First Document
          </Link>
        </div>
      ) : (
        <div className="documents-grid">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="document-card"
            >
              <div className="document-info">
                <span className="document-name">
                  {doc.name}
                </span>
                <span className="document-date">
                  Uploaded: {new Date(doc.createdAt).toLocaleString()}
                </span>
                <span className="document-status">
                  Status:{" "}
                  <span
                    className={`status-label ${
                      doc.status === "verified"
                        ? "status-verified"
                        : doc.status === "pending"
                        ? "status-pending"
                        : "status-other"
                    }`}
                  >
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </span>
              </div>

              <div className="document-actions">
                {doc.dataUrl && (
                  <a
                    href={doc.dataUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="view-btn"
                  >
                    <Eye size={16} /> View
                  </a>
                )}

                {/* Admin Actions */}
                {user?.role === "Admin" && doc.status !== "verified" && (
                  <button
                    onClick={() => handleVerify(doc.id)}
                    className="verify-btn"
                  >
                    <ShieldCheck size={16} /> Verify
                  </button>
                )}

                {/* Delete Button (Owner or Admin) */}
                {(user?.role === "Admin" || doc.owner === user.email) && (
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="delete-btn"
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
