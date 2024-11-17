import { useEffect, useState } from "react";
import NavigationLink from "./NavigationLink";
import axios from '../../../../axiosConfig.js'

import {
    ChartBarIcon,
    ChartPieIcon,
    CalendarIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const handleOpenClose = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token')

                if (!token) {
                    return
                }

                const response = await axios.get('/api/user/getuserinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const user = response.data.user
                setUsername(user.username)
            } catch (err) {
                alert(err)
                console.error(err)
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <nav
                className={`bg-neutral-900 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600
        ${isOpen ? 'w-64' : 'w-20'}
        transition-all duration-500 ease-in-out`}
            >
                <div className="relative flex flex-row w-full justify-between place-items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />

                    <div
                        className={`text-white font-poppins absolute left-10 transition-all duration-1000 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            transition: !isOpen ? 'none' : 'opacity 1000ms, transform 1000ms',
                        }}
                    >
                        {username}
                    </div>

                    <button
                        className="p-1 rounded-full flex transform transition-transform duration-500"
                        onClick={() => handleOpenClose()}
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className={`w-8 h-8 stroke-neutral-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-3">
                    <NavigationLink name="Dashboard" isOpen={isOpen} to='/home/dashboard' >
                        <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                    </NavigationLink>
                    <NavigationLink name="Events" isOpen={isOpen} to='/home/events'>
                        <CalendarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                    </NavigationLink>
                    <NavigationLink name="Analytics" isOpen={isOpen} to='/home/analytics'>
                        <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                    </NavigationLink>
                    <NavigationLink name="Network" isOpen={isOpen} to='/home/network'>
                        <UsersIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                    </NavigationLink>
                </div>
            </nav>
        </>
    );
};

export default Navigation;