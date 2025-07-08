import { UserProvider } from "@/context/userContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Dashboard from "@/pages/Dashboard"
import Admin from "@/pages/Admin"
import Profile from "@/pages/Profile"
import RequireAuth from "@/components/RequireAuth"
import RequireAdmin from "@/components/RequireAdmin"
import Layout from "@/components/Layout"
import "./App.css"

export default function App() {
  return (
    <UserProvider>

      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* Protected Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Layout>
                  <Dashboard />
                </Layout>
              </RequireAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Layout>
                  <Profile />
                </Layout>
              </RequireAuth>
            }
          />

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Layout>
                  <Admin />
                </Layout>
              </RequireAdmin>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}
