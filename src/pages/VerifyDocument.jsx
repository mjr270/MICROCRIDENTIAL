// src/pages/VerifyDocuments.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getDocs, saveDocs, saveDoc, deleteDoc as removeDoc } from "../utils/storage.js";
import { useAuth } from "../context/Authcontext.jsx";
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
    a.download = `microcred-docs-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold">Document Verification</h3>
            <p className="text-sm text-gray-500">Review and verify uploaded credentials</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded px-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by name, owner or id"
              className="px-2 py-2 outline-none bg-transparent text-sm min-w-[200px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="sr-only">Status filter</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800"
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
              className="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800"
              aria-label="Sort documents"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-3 py-2 border rounded bg-white dark:bg-gray-800 text-sm hover:shadow"
              title="Export filtered list as CSV"
            >
              <Download className="w-4 h-4" /> Export
            </button>

            {user?.role === "Admin" && (
              <button
                onClick={bulkVerifySelected}
                disabled={selected.size === 0}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded text-sm ${
                  selected.size === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <CheckSquare className="w-4 h-4" /> Verify Selected
              </button>
            )}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <p className="text-gray-600">No documents found for the current filters.</p>
            <p className="text-sm text-gray-400 mt-2">Try clearing the search or changing filters.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-3">
              {pageItems.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <input
                      aria-label={`Select document ${doc.name}`}
                      type="checkbox"
                      checked={selected.has(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{doc.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600">
                          {doc.type || "Document"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {doc.owner} • {new Date(doc.createdAt).toLocaleString()}
                      </div>
                      <div className="text-sm mt-1">
                        Status:{" "}
                        <span
                          className={
                            doc.status === "verified"
                              ? "text-green-600"
                              : doc.status === "pending"
                              ? "text-yellow-600"
                              : "text-gray-500"
                          }
                        >
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.dataUrl && (
                      <a
                        href={doc.dataUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 border rounded text-sm hover:bg-gray-50"
                        title="Open document"
                      >
                        <Eye className="w-4 h-4" /> Open
                      </a>
                    )}

                    {user?.role === "Admin" && doc.status !== "verified" && (
                      <button
                        onClick={() => verify(doc.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        <CheckSquare className="w-4 h-4" /> Verify
                      </button>
                    )}

                    {/* Owner or Admin can delete */}
                    {(user?.role === "Admin" || doc.owner === user?.email) && (
                      <button
                        onClick={() => deleteDoc(doc.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {(page - 1) * PAGE_SIZE + 1} -{" "}
                {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1 text-sm">
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
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
