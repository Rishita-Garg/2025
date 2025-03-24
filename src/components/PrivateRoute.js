"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const PrivateRoute = ({ children, userType }) => {
  const { currentUser, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (userType && currentUser.role !== userType) {
    return <Navigate to={currentUser.role === "jobseeker" ? "/dashboard" : "/employer/dashboard"} />
  }

  return children
}

export default PrivateRoute

