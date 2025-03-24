import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// Pages
import HomePage from "./pages/HomePage"
import JobListingsPage from "./pages/JobListingsPage"
import JobDetailsPage from "./pages/JobDetailsPage"
import JobApplicationPage from "./pages/JobApplicationPage"
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import JobSeekerDashboard from "./pages/JobSeekerDashboard"
import EmployerDashboard from "./pages/EmployerDashboard"
import PostJobPage from "./pages/PostJobPage"

// Context
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route
              path="/jobs/:id/apply"
              element={
                <PrivateRoute userType="jobseeker">
                  <JobApplicationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs/:id/apply/success"
              element={
                <PrivateRoute userType="jobseeker">
                  <ApplicationSuccessPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute userType="jobseeker">
                  <JobSeekerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/dashboard"
              element={
                <PrivateRoute userType="employer">
                  <EmployerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/post-job"
              element={
                <PrivateRoute userType="employer">
                  <PostJobPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

