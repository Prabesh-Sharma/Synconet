import React, { useState } from 'react'
import Form from './form/Form'
import axios from '../../../axiosConfig.js'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (data) => {
    try {
      const response = await axios.post('/api/user/register', data)
      console.log('baka', response.status)
      if (response.status === 201) {
        setMessage('check mail for verification link')
      }
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage('UserName already taken')
      } else if (err.status === 400) {
        setErrorMessage('Email already registered')
      } else {
        setErrorMessage('an unexpected error occured')
      }
    }
  }
  return (
    <>
      <Form
        type="register"
        onSubmit={handleRegister}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        message={message}
        setMessage={setMessage}
      />
    </>
  )
}

export default Register
