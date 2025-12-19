import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleDashboardRouter from './components/RoleDashboardRouter.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Chatbot from './components/Chatbot.jsx';

import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import LearnerDashboard from './pages/Dshboards/LearnerDashboard.jsx';
import InstitutionDashboard from './pages/Dshboards/InstitutionDashbord.jsx';
import EmployerDashboard from './pages/Dshboards/EmployerDashboard.jsx';
import AdminDashboard from './pages/Dshboards/AdminDashboard.jsx';

import DocumentUpload from './pages/DocumentUpload.jsx';
import VerifyDocuments from './pages/VerifyDocument.jsx';
import UploadPage from "./pages/UploadPage.jsx";
import Verify from "./pages/VerifyDocument.jsx";

import NotFound from './pages/NotFound.jsx';
import Unauthorized from './pages/Uanuthorized.jsx';
import ProfileRouter from "./pages/ProfileRouter.jsx";
import Verification from './pages/Verification.jsx';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Role-based Dashboard Router - redirects to correct dashboard based on user role */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <RoleDashboardRouter />
            </ProtectedRoute>
          } />

          {/* Protected Routes */}
          <Route path="/upload" element={
            <ProtectedRoute allowedRoles={['Learner', 'Institution']}>
              <DocumentUpload />
            </ProtectedRoute>
          } />

          <Route path="/verify" element={
            <ProtectedRoute allowedRoles={['Admin', 'Institution', 'Employer']}>
              <VerifyDocuments />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/learner" element={
            <ProtectedRoute allowedRoles={['Learner']}>
              <LearnerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/institution" element={
            <ProtectedRoute allowedRoles={['Institution']}>
              <InstitutionDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/employer" element={
            <ProtectedRoute allowedRoles={['Employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Public Upload */}
          <Route path="/src/pages" element={<UploadPage />} />

          {/* Protected Verify Page */}
          <Route path="/verify-page" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <Verify />
            </ProtectedRoute>
          } />

          {/* 404 and unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

          {/* Profile (requires login) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileRouter />
              </ProtectedRoute>
            }
          />
        </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}

export default App;