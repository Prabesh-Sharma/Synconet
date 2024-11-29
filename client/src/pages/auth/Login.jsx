import React, { useState } from 'react';
import Form from './form/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (data) => {
        try {
            const response = await login(data);
            if (response.status === 200) {
                navigate('/home/dashboard');
            } else if (response.status === 400) {
                setErrorMessage('Email not Verified');
            } else if (response.status === 404) {
                setErrorMessage('Email not found.');
            } else if (response.status === 401) {
                setErrorMessage('Invalid email or password.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <Form type="login" onSubmit={handleLogin} error={errorMessage} />
        </>
    );
};

export default Login;