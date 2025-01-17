import { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '../../axiosConfig.js'

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)

  const login = async (userData) => {
    try {
      const response = await axios.post('/api/user/login', userData)
      if (response.status === 200) {
        const newToken = response.data.token
        localStorage.setItem('token', newToken)
        setToken(newToken)
        setIsAuthenticated(true)
        return response
      }
    } catch (err) {
      if (err.response) {
        throw err.response
      } else {
        throw new Error('An unexpected error occurred.')
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
  }

  const validateToken = async () => {
    const response = await axios.get('/api/user/getuserinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status === 200) {
      setIsAuthenticated(true)
    }
    return response.data.user
  }

  const { data: userData, error: autherr } = useQuery({
    queryKey: ['login'],
    queryFn: validateToken,
    enabled: !!token,
    refetchInterval: 10000,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  const username = userData?.username
  const email = userData?.email

  useEffect(() => {
    if (autherr) {
      logout()
    }
  }, [autherr])

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, username, email }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
