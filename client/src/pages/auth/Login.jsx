import React, { useEffect, useState } from 'react';
import Form from './form/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('')

    const handleLogin = async (data) => {
        try {
            const response = await login(data);
            if (response.status === 200) {
                navigate('/home/dashboard');
            }
        } catch (err) {
            if (err.status === 400) {
                setErrorMessage('Email not Verified');
            } else if (err.status === 404) {
                setErrorMessage('Email not found.');
            } else if (err.status === 401) {
                setErrorMessage('Invalid email or password.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Form type="login" onSubmit={handleLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage} setMessage={setMessage} message={message} />
        </>
    );
};

export default Login;