import { UserCheck, UserPlusIcon } from 'lucide-react'
import React, { useState } from 'react'

const Card = ({ recomms }) => {
  const [requestedUsers, setRequestedUsers] = useState({})

  const toggleReq = (index) => {
    setRequestedUsers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="flex flex-wrap gap-2 m-4 items-center justify-center">
      {recomms.map((recomm, i) => (
        <div
          key={i}
          className="text-slate-300 mb-1 p-3 rounded relative flex flex-col bg-neutral-800/75"
        >
          <div className="relative group">
            {requestedUsers[i] ? (
              <UserCheck
                className="size-8 absolute top-2 right-2 hover:text-white cursor-pointer"
                onClick={() => toggleReq(i)}
              />
            ) : (
              <UserPlusIcon
                className="size-8 absolute top-2 right-2 hover:text-white cursor-pointer"
                onClick={() => toggleReq(i)}
              />
            )}
            {/* Tooltip */}
            <div className="cursor-default absolute right-10 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {requestedUsers[i] ? 'Friend Request Sent' : 'Add Friend'}
            </div>
          </div>
          <div className="flex flex-row">
            <img
              src={recomm.profilePicture}
              alt={`${recomm.username}'s profile`}
              className="size-10 rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">{recomm.username}</div>
              <div className="text-sm text-gray-400">{recomm.email}</div>
            </div>
          </div>
          <div className="mt-2">
            <div className="mb-1 text-lg font-semibold">Interests</div>
            <div className="relative flex flex-wrap gap-2 w-30">
              {recomm.Interests.map((interest, j) => (
                <div
                  key={j}
                  className="px-2 py-1 bg-neutral-700/100 rounded text-sm 
                             hover:text-white hover:bg-neutral-800 cursor-pointer 
                             border-slate-200 hover:border-white border-2"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
