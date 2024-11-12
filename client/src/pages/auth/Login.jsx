import React from 'react'
import Input from './form/components/Input'

const Login = () => {
    return (
        <div className='w-full h-screen gap-x-60 flex flex-row items-center justify-center text-white'>
            <div className="w-1/4 h-3/4 border border-neutral-500/50 bg-neutral-800/20 rounded 
            flex flex-col items-center justify-center">
                <div className='text-4xl font-semibold flex mb-2'>welcome</div>
                <Input placeholder="Username" name="Username" id="Username" />
                <Input placeholder="Email address" name="Email address" id="Email address" />
                <Input placeholder="Password" name="Password" id="Password" />
                <div className='mt-12'>register</div>
            </div>
            <div>
                <img src='/logo.png' className='h-60 w-60' />
            </div>
        </div>
    )
}

export default Login