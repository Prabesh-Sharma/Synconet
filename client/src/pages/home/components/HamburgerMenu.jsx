import {
  ArrowLeftStartOnRectangleIcon,
  Bars4Icon,
  CalendarDateRangeIcon,
  ChartPieIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../../../context/AuthContext'

import React, { useState } from 'react'
import NavigationLink from './NavigationLink'
import { CogIcon } from 'lucide-react'

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  return (
    <div
      className="bg-neutral-900 shadow-neutral-600 z-10 fixed top-0 
                          mx-auto w-full flex-wrap flex items-center justify-between px-8"
    >
      <img
        src="/logo.png"
        alt="logo"
        className="h-20 w-20"
        onClick={() => (window.location.href = '/')}
      />
      <div className="text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon className="text-inherit w-8 h-8" />
        ) : (
          <Bars4Icon className="text-inherit w-8 h-8" />
        )}
      </div>
      {isOpen && (
        <div className="text-white flex basis-full flex-col items-end px-4">
          <NavigationLink name="Dashboard" isOpen={true} to="/home/dashboard">
            <RectangleGroupIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Events" isOpen={true} to="/home/events">
            <CalendarDateRangeIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Analytics" isOpen={true} to="/home/analytics">
            <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Network" isOpen={true} to="/home/network">
            <UserGroupIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="settings" isOpen={true} to="/home/settings">
            <CogIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <div onClick={logout}>
            <NavigationLink name="Logout" isOpen={true} to="/login">
              <ArrowLeftStartOnRectangleIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
