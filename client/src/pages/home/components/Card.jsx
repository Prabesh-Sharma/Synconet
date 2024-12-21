import { UserPlusIcon, UserRoundCheckIcon } from 'lucide-react'
import React, { useState } from 'react'

const Card = ({ recomms }) => {
  const [iconStates, setIconStates] = useState(
    recomms.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  )

  const handleClick = (index) => {
    setIconStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }))
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 m-4">
        {recomms.map((recomm, i) => (
          <div
            key={i}
            className="text-slate-400 mb-1 p-3 rounded relative flex flex-col bg-neutral-800/75"
          >
            {iconStates[i] ? (
              <UserPlusIcon
                className="absolute top-2 right-2 hover:text-white cursor-pointer"
                onClick={() => handleClick(i)}
              />
            ) : (
              <UserRoundCheckIcon
                className="absolute top-2 right-2 hover:text-white cursor-pointer"
                onClick={() => handleClick(i)}
              />
            )}
            <div className="font-semibold">{recomm.username}</div>
            <div className="text-sm text-gray-400">{recomm.email}</div>
            <div className="mt-2">
              <div className="relative flex flex-wrap gap-2 w-30">
                {recomm.Interests.map((interest, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-neutral-800/100 rounded-md text-sm 
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
    </>
  )
}

export default Card
