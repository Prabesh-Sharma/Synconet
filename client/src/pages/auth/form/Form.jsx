import React, { useState } from 'react'
import Input from './components/Input'
import { useNavigate } from 'react-router-dom'
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline'

const Form = ({ type, onSubmit, errorMessage, message, setMessage, setErrorMessage }) => {
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
        setData({
            username: "",
            email: "",
            password: "",
        })
        setErrorMessage('')
        setMessage('')
        onSubmit(data)
    }

    return (
        <>
            <div className='w-full h-screen gap-x-60 flex flex-row items-center justify-center text-white'>
                <div className="w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 h-3/4 border border-neutral-500/50 bg-neutral-800/20 rounded 
            flex flex-col items-center justify-center relative">
                    <div
                        className='absolute top-0 left-0 w-full h-full flex items-center justify-center lg:hidden opacity-35 z-10'>
                        <img src='/logo.png' className='h-80 w-80' />
                    </div>
                    {type === "login" ?
                        < div className='text-4xl font-semibold flex mb-2'>welcome back</div> :
                        < div className='text-4xl font-semibold flex mb-2'>welcome</div>
                    }
                    <form onSubmit={handleSubmit}>
                        {type === "register" && <Input placeholder="Username" type="text" value={data.username} name="username" id="Username" onChange={handleChange} />}
                        <Input placeholder="Email address" name="email" id="Email address" value={data.email} type='email' onChange={handleChange} />
                        <Input placeholder="Password" name="password" id="Password" value={data.password} type='password' onChange={handleChange} />
                        <div>
                            {errorMessage && (
                                <div className="text-red-500 text-sm italic flex absolute mt-4">
                                    {errorMessage}
                                </div>
                            )}
                            {message && (
                                <div className="text-green-500 text-sm italic flex absolute mt-4">
                                    {message}
                                </div>
                            )}
                        </div>
                        <div className='mt-12 w-full flex justify-center'>
                            {
                                type === 'register' ?
                                    <button className=' bg-slate-50 px-2 py-1 rounded-md text-blue-950 
                                    hover:bg-blue-800 hover:text-slate-50 hover:rounded-3xl hover:border-slate-50 
                                    transition-all border-blue-800 border-2 flex flex-row gap-1 stroke-[2]'
                                        type='submit'>Sign up<UserPlusIcon className="stroke-[1.75] min-w-6 w-6" /></button> :

                                    <button className='bg-slate-50 px-2 py-1 rounded-md text-blue-950 
                                    hover:bg-blue-800 hover:text-slate-50 hover:rounded-3xl hover:border-slate-50 
                                    transition-all border-blue-800 border-2 flex flex-row gap-1'
                                        type='submit'>Login<ArrowRightEndOnRectangleIcon className="stroke-[1.75] min-w-6 w-6" /></button>
                            }
                        </div>
                        <div className='mt-2 w-full flex justify-center'>
                            {
                                type === 'register' ?
                                    <span onClick={() => navigate('/login')} className='text-blue-600 hover:underline cursor-pointer'>Already signed in? Login</span > :
                                    <span onClick={() => navigate('/register')} className='text-blue-600 hover:underline cursor-pointer'>Don't have an account? SignUp</span >
                            }
                        </div>
                    </form>
                </div>
                <div className='hidden lg:flex'>
                    <img src='/logo.png' className='h-60 w-60' />
                </div>
            </div >
        </>
    )
}

export default Form