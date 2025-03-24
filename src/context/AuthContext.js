"use client"

import { createContext, useState, useEffect } from "react"
import { mockUsers } from "../data/mockData"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        const user = mockUsers.find((user) => user.email === email)

        if (user && password === "password") {
          // Mock password check
          // Store user in localStorage for persistence
          localStorage.setItem("currentUser", JSON.stringify(user))
          setCurrentUser(user)
          resolve(user)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Check if email already exists
        const existingUser = mockUsers.find((user) => user.email === userData.email)
        if (existingUser) {
          reject(new Error("Email already in use"))
          return
        }

        // Create a new user
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          savedJobs: [],
          appliedJobs: [],
        }

        // Store user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(newUser))
        setCurrentUser(newUser)
        resolve(newUser)
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  const updateUser = (userData) => {
    const updatedUser = { ...currentUser, ...userData }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!currentUser,
        isJobSeeker: currentUser?.role === "jobseeker",
        isEmployer: currentUser?.role === "employer",
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

