import React from 'react'
import Form from './form/Form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()

    const handleRegister = (data) => {
        console.log("form submitted")
    }
    return (
        <>
            <Form type="register" onSubmit={handleRegister} />
        </>
    )
}

export default Register