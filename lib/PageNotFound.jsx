import React from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function PageNotFound() {
  const location = useLocation()
  const pageName = location.pathname.replace("/", "")

  // Simple auth check
  const { data: authData, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("access_token")

        if (!token) {
          return { user: null, isAuthenticated: false }
        }

        const { data } = await axios.get("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        return { user: data, isAuthenticated: true }
      } catch {
        return { user: null, isAuthenticated: false }
      }
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-6">

        {/* 404 */}
        <div>
          <h1 className="text-7xl font-light text-gray-300">404</h1>
          <div className="h-0.5 w-16 bg-gray-200 mx-auto mt-2" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-gray-800">
            Page not found
          </h2>
          <p className="text-gray-600">
            The page{" "}
            <span className="font-medium text-gray-700">
              "{pageName || "unknown"}"
            </span>{" "}
            doesn’t exist.
          </p>
        </div>

        {/* Admin note */}
        {isFetched &&
          authData?.isAuthenticated &&
          authData?.user?.role === "admin" && (
            <div className="p-4 bg-gray-100 border rounded-lg text-left">
              <p className="text-sm font-medium text-gray-700">
                Admin note
              </p>
              <p className="text-sm text-gray-600">
                This page hasn’t been created yet. You can add it or update your routes.
              </p>
            </div>
          )}

        {/* Button */}
        <div className="pt-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 text-sm font-medium border rounded-lg bg-white hover:bg-gray-50"
          >
            Go home
          </button>
        </div>

      </div>
    </div>
  )
}
