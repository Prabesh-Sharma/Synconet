import React from 'react'
import Form from './form/Form'
import { useNavigate } from 'react-router-dom'
import axios from '../../../axiosConfig.js'

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = async (data) => {
        try {
            const response = await axios.post('/api/user/login', data)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                navigate('/home/dashboard')
            } else {
                alert("login failed")
            }
        }
        catch (err) {
            alert(err?.response?.data?.message)
        }
    }
    return (
        <>
            <Form type="login" onSubmit={handleLogin} />
        </>
    )
}

export default Login