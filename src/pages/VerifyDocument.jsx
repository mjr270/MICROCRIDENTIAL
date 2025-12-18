// src/pages/VerifyDocuments.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getDocs, saveDocs, saveDoc, deleteDoc as removeDoc } from "../utils/storage.js";
import { useAuth } from "../context/Authcontext.jsx";
import "../Style/VerifyDocument.css";
import {
  Search,
  FileText,
  Download,
  CheckSquare,
  Trash2,
  Eye,
  Loader2,
  Filter,
} from "lucide-react";

const PAGE_SIZE = 8;

export default function VerifyDocuments() {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | pending | verified | rejected
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | name
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);

  // fetch docs
  useEffect(() => {
    setLoading(true);
    try {
      const all = getDocs() || [];
      setDocs(all);
    } catch (e) {
      console.error("Failed to load docs", e);
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // stats derived
  const statsSummary = useMemo(() => {
    const total = docs.length;
    const verified = docs.filter(d => d.status === 'verified').length;
    const pending = docs.filter(d => d.status === 'pending').length;
    return { total, verified, pending };
  }, [docs]);

  // derived: filtered & sorted docs
  const filtered = useMemo(() => {
    let list = [...docs];

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          (d.name || "").toLowerCase().includes(q) ||
          (d.owner || "").toLowerCase().includes(q) ||
          (d.id || "").toLowerCase().includes(q)
      );
    }

    // status filter
    if (statusFilter !== "all") {
      list = list.filter((d) => d.status === statusFilter);
    }

    // role-based visibility: Admin sees all; others see only their docs or role-owned
    // (If you want stricter rules, enforce server-side.)
    // NOTE: If user is not defined, hide all
    if (!user) return [];

    if (user.role !== "Admin") {
      list = list.filter((d) => d.owner === user.email || d.owner === user.role);
    }

    // sort
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "name") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return list;
  }, [docs, query, statusFilter, sortBy, user]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // utility helpers
  const updateLocalDoc = (updated) => {
    const next = docs.map((d) => (d.id === updated.id ? updated : d));
    setDocs(next);
    saveDocs(next);
  };

  const verify = (id) => {
    if (!window.confirm("Mark this document as VERIFIED?")) return;
    const doc = docs.find((d) => d.id === id);
    if (!doc) return;
    const updated = { ...doc, status: "verified", verifiedAt: new Date().toISOString() };
    updateLocalDoc(updated);
    setToast({ type: 'success', message: `${doc.name} verified` });
    try { import('../utils/confetti').then(m => m.burstConfetti({ count: 16 })).catch(()=>{}); } catch(e) {}
    setTimeout(() => setToast(null), 2200);
  };

  const bulkVerifySelected = () => {
    if (selected.size === 0) return alert("No documents selected.");
    if (!window.confirm(`Verify ${selected.size} selected document(s)?`)) return;
    const next = docs.map((d) =>
      selected.has(d.id) ? { ...d, status: "verified", verifiedAt: new Date().toISOString() } : d
    );
    setDocs(next);
    saveDocs(next);
    setSelected(new Set());
    setToast({ type: 'success', message: `${selected.size} documents verified` });
    try { import('../utils/confetti').then(m => m.burstConfetti({ count: Math.min(40, selected.size * 6) })) } catch(e) {}
    setTimeout(() => setToast(null), 2200);
  };

  const deleteDoc = (id) => {
    if (!window.confirm("Delete this document permanently?")) return;
    removeDoc(id);
    const remaining = docs.filter((d) => d.id !== id);
    setDocs(remaining);
    setToast({ type: 'success', message: 'Document deleted' });
    setTimeout(() => setToast(null), 1500);
  };

  const toggleSelect = (id) => {
    const copy = new Set(selected);
    if (copy.has(id)) copy.delete(id);
    else copy.add(id);
    setSelected(copy);
  };

  const exportCSV = () => {
    const toExport = filtered; // respect current filters
    if (toExport.length === 0) return alert("No documents to export.");

    const rows = [
      ["id", "name", "owner", "status", "createdAt", "verifiedAt", "dataUrl"],
      ...toExport.map((d) => [
        d.id,
        d.name,
        d.owner,
        d.status,
        d.createdAt,
        d.verifiedAt || "",
        d.dataUrl || "",
      ]),
    ];

    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KaushalLink-docs-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="verify-loading-wrapper">
        <Loader2 className="verify-loading-icon" />
      </div>
    );
  }

  return (
    <div className="verify-container">
      <div className="verify-header">
        <div className="verify-title-section">
          <FileText className="verify-icon" />
          <div>
            <h3 className="verify-title">Document Verification</h3>
            <p className="verify-subtitle">Review and verify uploaded credentials</p>
          </div>
        </div>

        {/* Controls */}
        <div className="verify-controls">
          <div className="verify-search-wrapper">
            <Search className="verify-search-icon" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by name, owner or id"
              className="verify-search-input"
            />
          </div>

          <div className="verify-filters-group">
            <label className="sr-only">Status filter</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="verify-select"
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="verify-select"
              aria-label="Sort documents"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          <div className="verify-actions-group">
            <button
              onClick={exportCSV}
              className="verify-export-btn"
              title="Export filtered list as CSV"
            >
              <Download className="verify-doc-icon" /> Export
            </button>

            {user?.role === "Admin" && (
              <button
                onClick={bulkVerifySelected}
                disabled={selected.size === 0}
                className={`verify-bulk-btn ${
                  selected.size === 0 ? "disabled" : "active"
                }`}
              >
                <CheckSquare className="verify-doc-icon" /> Verify Selected
              </button>
            )}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="verify-list">
        {filtered.length === 0 ? (
          <div className="verify-empty-state">
            <p className="verify-empty-message">No documents found for the current filters.</p>
            <p className="verify-empty-hint">Try clearing the search or changing filters.</p>
          </div>
        ) : (
          <>
            <div className="verify-docs-grid">
              {pageItems.map((doc) => (
                <div
                  key={doc.id}
                  className="verify-doc-card"
                >
                  <div className="verify-doc-content">
                    <input
                      aria-label={`Select document ${doc.name}`}
                      type="checkbox"
                      checked={selected.has(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="verify-doc-checkbox"
                    />
                    <div>
                      <div className="verify-doc-header">
                        <span className="verify-doc-name">{doc.name}</span>
                        <span className="verify-doc-type-badge">
                          {doc.type || "Document"}
                        </span>
                      </div>
                      <div className="verify-doc-meta">
                        {doc.owner} • {new Date(doc.createdAt).toLocaleString()}
                      </div>
                      <div className="verify-doc-status">
                        <span className="verify-doc-status-label">Status: </span>
                        <span
                          className={`verify-doc-status-value ${
                            doc.status === "verified"
                              ? "verified"
                              : doc.status === "pending"
                              ? "pending"
                              : "default"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="verify-doc-actions">
                    {doc.dataUrl && (
                      <a
                        href={doc.dataUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="verify-doc-open-btn"
                        title="Open document"
                      >
                        <Eye className="verify-doc-icon" /> Open
                      </a>
                    )}

                    {user?.role === "Admin" && doc.status !== "verified" && (
                      <button
                        onClick={() => verify(doc.id)}
                        className="verify-doc-verify-btn"
                      >
                        <CheckSquare className="verify-doc-icon" /> Verify
                      </button>
                    )}

                    {/* Owner or Admin can delete */}
                    {(user?.role === "Admin" || doc.owner === user?.email) && (
                      <button
                        onClick={() => deleteDoc(doc.id)}
                        className="verify-doc-delete-btn"
                      >
                        <Trash2 className="verify-doc-icon" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* pagination */}
            <div className="verify-pagination">
              <div className="verify-pagination-info">
                Showing {(page - 1) * PAGE_SIZE + 1} -{" "}
                {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </div>

              <div className="verify-pagination-controls">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="verify-pagination-btn"
                >
                  Prev
                </button>
                <span className="verify-pagination-text">
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="verify-pagination-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
