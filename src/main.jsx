import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/Authcontext";

/**
 * Loading fallback for Suspense & AuthProvider
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-600 dark:text-gray-300 animate-pulse">
        Loading application...
      </p>
    </div>
  );
}

/**
 * Global Error Boundary
 * Catches rendering errors to prevent blank screens in production
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 dark:bg-red-900 px-4">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Something went wrong.
          </h1>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            {this.state.error?.message || "Please refresh the page or try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Render Application
 */
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
