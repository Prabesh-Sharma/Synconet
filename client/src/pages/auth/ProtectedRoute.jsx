import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>
  }

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>
}

export default ProtectedRoute
