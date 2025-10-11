import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import LearnerDashboard from './pages/Dshboards/LearnerDashboard.jsx'
import InstitutionDashboard from './pages/Dshboards/InstitutionDashbord.jsx'
import EmployerDashboard from './pages/Dshboards/EmployerDashboard.jsx'
import AdminDashboard from './pages/Dshboards/AdminDashboard.jsx'
import DocumentUpload from './pages/DocumentUpload.jsx'
import VerifyDocuments from './pages/VerifyDocument.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Unauthorized from './pages/Uanuthorized.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={
            <ProtectedRoute allowedRoles={['Learner', 'Institution']}>
              <DocumentUpload />
            </ProtectedRoute>
          } />
          <Route path="/verify" element={
            <ProtectedRoute allowedRoles={['Admin']}>
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
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
