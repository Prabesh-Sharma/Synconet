import React, { useState } from 'react'
import Input from './components/Input'
import { useNavigate } from 'react-router-dom'

const Form = ({ type, onSubmit }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
        ...(type === "register" && { username: '' })
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(data)
    }

    return (
        <>
            <div className='w-full h-screen gap-x-60 flex flex-row items-center justify-center text-white'>
                <div className="w-1/4 h-3/4 border border-neutral-500/50 bg-neutral-800/20 rounded 
            flex flex-col items-center justify-center">
                    {type === "login" ?
                        < div className='text-4xl font-semibold flex mb-2'>welcome back</div> :
                        < div className='text-4xl font-semibold flex mb-2'>welcome</div>
                    }
                    <form onSubmit={handleSubmit}>
                        {type === "register" && <Input placeholder="Username" type="text" name="username" id="Username" onChange={handleChange} />}
                        <Input placeholder="Email address" name="email" id="Email address" type='email' onChange={handleChange} />
                        <Input placeholder="Password" name="password" id="Password" type='text' onChange={handleChange} />
                        <div className='mt-12 w-full flex justify-center'>
                            {
                                type === 'register' ?
                                    <button className=' bg-slate-50 p-1 rounded-md text-gray-900' type='submit'>sign up</button> :
                                    <button className=' bg-slate-50 p-1 rounded-md text-gray-900' type='submit'>sign in</button>
                            }
                        </div>
                        <div className='mt-2 w-full flex justify-center'>
                            {
                                type === 'register' ?
                                    <span onClick={() => navigate('/login')} className='text-blue-700 hover:underline cursor-pointer'>Already signed in? Login</span > :
                                    <span onClick={() => navigate('/register')} className='text-blue-700 hover:underline cursor-pointer'>Don't have an account? signUp</span >
                            }
                        </div>
                    </form>
                </div>
                <div>
                    <img src='/logo.png' className='h-60 w-60' />
                </div>
            </div >
        </>
    )
}

export default Form