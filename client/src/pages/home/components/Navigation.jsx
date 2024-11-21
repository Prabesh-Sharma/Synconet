import { useEffect, useState } from "react";
import NavigationLink from "./NavigationLink";
import axios from '../../../../axiosConfig.js'

import {
    ChartBarIcon,
    ChartPieIcon,
    CalendarIcon,
    UsersIcon,
    ArrowLeftEndOnRectangleIcon,
    Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const { logout } = useAuth()

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
                className={`bg-neutral-900 flex flex-col z-10 gap-14 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600
        ${isOpen ? 'w-56' : 'w-20'}
        transition-all duration-500 ease-in-out`}
                onMouseEnter={handleOpenClose}
                onMouseLeave={handleOpenClose}
            >
                <div className="relative flex flex-row w-full justify-between place-items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full" />

                    <div
                        className={`flex absolute left-12 text-neutral-400 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
                    >
                        {username}
                    </div>

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
                <div className="flex flex-col mt-52 gap-3">
                    <NavigationLink name="settings" isOpen={isOpen} to='/home/settings'>
                        <Cog8ToothIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                    </NavigationLink>
                    <div onClick={logout}>
                        <NavigationLink name="Logout" isOpen={isOpen} to='/login'>
                            <ArrowLeftEndOnRectangleIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;