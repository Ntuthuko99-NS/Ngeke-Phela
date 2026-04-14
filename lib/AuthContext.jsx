import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import { appParams } from "@/lib/app-params"

// Create context
const AuthContext = createContext(null)

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingApp, setIsLoadingApp] = useState(true)

  const [authError, setAuthError] = useState(null)
  const [appSettings, setAppSettings] = useState(null)

  useEffect(() => {
    initializeApp()
  }, [])

  // Initialize app + auth
  async function initializeApp() {
    try {
      setIsLoadingApp(true)
      setAuthError(null)

      // Create a simple API client
      const api = axios.create({
        baseURL: "/api",
        headers: {
          "X-App-Id": appParams.appId,
        },
      })

      // Fetch public app settings
      const { data } = await api.get(`/apps/${appParams.appId}/settings`)
      setAppSettings(data)

      // If we have a token, try to fetch the user
      if (appParams.token) {
        await loadUser()
      } else {
        setIsAuthenticated(false)
        setIsLoadingAuth(false)
      }

      setIsLoadingApp(false)
    } catch (error) {
      console.error("App initialization failed:", error)

      setAuthError({
        type: "error",
        message: error.message || "Failed to load app",
      })

      setIsLoadingApp(false)
      setIsLoadingAuth(false)
    }
  }

  // Load current user
  async function loadUser() {
    try {
      setIsLoadingAuth(true)

      const { data } = await axios.get("/api/me", {
        headers: {
          Authorization: `Bearer ${appParams.token}`,
        },
      })

      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("User auth failed:", error)

      setUser(null)
      setIsAuthenticated(false)

      if (error.response?.status === 401) {
        setAuthError({
          type: "auth_required",
          message: "Please log in",
        })
      }
    } finally {
      setIsLoadingAuth(false)
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem("access_token")
    setUser(null)
    setIsAuthenticated(false)
  }

  // Redirect to login
  function goToLogin() {
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingApp,
        authError,
        appSettings,
        logout,
        goToLogin,
        refresh: initializeApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
