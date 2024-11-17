import React from 'react'
import Form from './form/Form'
import { useNavigate } from 'react-router-dom'
import axios from '../../../axiosConfig.js'

const Register = () => {
    const navigate = useNavigate()

    const handleRegister = async (data) => {
        try {
            const response = await axios.post('/api/user/register', data)
            if (response.status === 201) {
                navigate('/login')
            } else {
                alert("registration failed")
            }
        } catch (err) {
            console.error(err)
            alert("error")
        }
    }
    return (
        <>
            <Form type="register" onSubmit={handleRegister} />
        </>
    )
}

export default Register