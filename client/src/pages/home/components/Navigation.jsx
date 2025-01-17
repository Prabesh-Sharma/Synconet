import { useState } from 'react'
import NavigationLink from './NavigationLink'

import {
  RectangleGroupIcon,
  CalendarDateRangeIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon,
  InboxArrowDownIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../../../context/AuthContext.jsx'
import { CircleUserRound } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const { username } = useAuth()

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav
        className={`bg-neutral-900 flex flex-col justify-between z-10 p-5 fixed top-0 left-0 h-lvh shadow shadow-neutral-600
        ${isOpen ? 'w-56' : 'w-20'}
        transition-all duration-300 ease-in-out`}
        onMouseEnter={handleOpenClose}
        onMouseLeave={handleOpenClose}
      >
        <div className="flex flex-col gap-14">
          <div className="relative flex flex-row w-full justify-between place-items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full" />

            <div
              className={`absolute left-14 text-neutral-100 whitespace-nowrap transition-all ease-in-out ${
                isOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-5'
              }`}
              style={{
                visibility: isOpen ? 'visible' : 'hidden',
              }}
            >
              {username}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <NavigationLink
              name="Dashboard"
              isOpen={isOpen}
              to="/home/dashboard"
            >
              <RectangleGroupIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
            <NavigationLink name="Events" isOpen={isOpen} to="/home/events">
              <CalendarDateRangeIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
            <NavigationLink name="Inbox" isOpen={isOpen} to="/home/inbox">
              <InboxArrowDownIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
            <NavigationLink name="Network" isOpen={isOpen} to="/home/network">
              <UserGroupIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <NavigationLink name="Profile" isOpen={isOpen} to="/home/profile">
            <CircleUserRound className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <div onClick={logout}>
            <NavigationLink name="Logout" isOpen={isOpen} to="/login">
              <ArrowLeftStartOnRectangleIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
