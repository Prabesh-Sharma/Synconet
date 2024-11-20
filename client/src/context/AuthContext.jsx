//create context needs a default value
//get the data from the login component to the login function
/**
 * createContext
 * Context.Provider has props and returns the children
 * wrap with the provider
 * export useContext pass in the context created to useContext
 */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))

    const login = async ({ userData }) => {
        try {
            const response = await axios.post('/api/user/login', userData)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
            } else {
                alert("login failed")
            }
        }
        catch (err) {
            alert(err?.response?.data?.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    isAuthenticated = !!token

    useEffect(() => {
        const validate = async () => {
            if (token) {
                try {
                    const response = await axios.get("/api/user/getuserinfo", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                }
                catch (err) {
                    console.log("error validating token or token expired")
                    logout()
                }
            }
        }
        validate()
    }, [token])

    return
    (
        <AuthContext.Provider value={{
            login, logout, isAuthenticated
        }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => useContext(AuthContext)