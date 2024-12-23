import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Dashboard from './pages/home/pages/Dashboard'
import Events from './pages/home/pages/Events'
import Network from './pages/home/pages/Network'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './pages/auth/ProtectedRoute'
import Settings from './pages/home/pages/Settings'
import Inbox from './pages/home/pages/Inbox'

const App = () => {
  return (
    <main className="w-full flex flex-row relative">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/home/dashboard" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="events" element={<Events />} />
              <Route path="network" element={<Network />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </main>
  )
}

export default App
