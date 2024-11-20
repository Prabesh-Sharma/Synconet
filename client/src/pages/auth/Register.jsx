import React, { useState } from 'react'
import Form from './form/Form'
import { useNavigate } from 'react-router-dom'
import axios from '../../../axiosConfig.js'

const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (data) => {
        try {
            const response = await axios.post('/api/user/register', data)
            if (response.status === 201) {
                navigate('/login')
            } else {
                setErrorMessage('User already exists')
            }
        } catch (err) {
            setErrorMessage('User already exists')
        }
    }
    return (
        <>
            <Form type="register" onSubmit={handleRegister} error={errorMessage} />
        </>
    )
}

export default Register