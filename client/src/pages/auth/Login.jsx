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
            const result = await login(data);
            if (result.success) {
                navigate('/home/dashboard');
            } else {
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