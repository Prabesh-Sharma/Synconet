import React, { useState } from 'react'
import Form from './form/Form'
import axios from '../../../axiosConfig.js'

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const handleRegister = async (data) => {
        try {
            const response = await axios.post('/api/user/register', data)
            if (response.status === 201) {
                setMessage('check mail for verification link')
            } else {
                setErrorMessage('User already exists')
            }
        } catch (err) {
            setErrorMessage('User already exists')
        }
    }
    return (
        <>
            <Form type="register" onSubmit={handleRegister} setErrorMessage={setErrorMessage} errorMessage={errorMessage} message={message} setMessage={setMessage} />
        </>
    )
}

export default Register