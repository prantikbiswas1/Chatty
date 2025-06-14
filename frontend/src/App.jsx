import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useAuthStore } from "./store/useAuthStore"

import { Toaster } from "react-hot-toast"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignupPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useEffect } from "react"

import { Loader } from "lucide-react"
import { useThemeStore } from "./store/useThemeStore"



const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  console.log(onlineUsers)
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  )


  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App