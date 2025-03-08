import {
  ArrowLeftStartOnRectangleIcon,
  Bars4Icon,
  BellIcon,
  CalendarDateRangeIcon,
  RectangleGroupIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../../../context/AuthContext'

import React, { useState } from 'react'
import NavigationLink from './NavigationLink'
import { CircleUserRound, XIcon } from 'lucide-react'

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  return (
    <div
      className="bg-neutral-900 shadow-neutral-600 z-10 fixed top-0 
                          mx-auto w-full flex-col flex justify-between"
    >
      <div className="w-full flex justify-between items-center px-2">
        <img
          src="/logo.png"
          alt="logo"
          className="h-20 w-20"
          onClick={() => (window.location.href = '/')}
        />
        <div className="text-white" onClick={() => setIsOpen(!isOpen)}>
          <Bars4Icon className="text-inherit w-8 h-8" />
        </div>
      </div>

      <div
        className={`text-white bg-inherit space-y-3 absolute w-full transition-all duration-300
          ${isOpen ? 'left-0' : '-left-full'}`}
      >
        <div
          className="text-white flex justify-between items-center px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/logo.png"
            alt="logo"
            className="h-20 w-20"
            onClick={() => (window.location.href = '/')}
          />
          <XIcon className="text-inherit w-8 h-8" />
        </div>
        <div className="px-2 space-y-1 py-2">
          <NavigationLink name="Dashboard" isOpen={true} to="/home/dashboard">
            <RectangleGroupIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Events" isOpen={true} to="/home/events">
            <CalendarDateRangeIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Network" isOpen={true} to="/home/network">
            <UserGroupIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Notifications" isOpen={true} to="/home/notifications">
            <BellIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Profile" isOpen={true} to="/home/profile">
            <CircleUserRound className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <div onClick={logout}>
            <NavigationLink name="Logout" isOpen={true} to="/login">
              <ArrowLeftStartOnRectangleIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu
