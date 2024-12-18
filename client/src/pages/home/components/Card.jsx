import { Send } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ recomms }) => {
  console.log(recomms)
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-wrap gap-2 m-4">
        {recomms.map((recomm, i) => (
          <div
            key={i}
            className="text-slate-300 mb-1 p-3 rounded relative flex flex-col bg-neutral-800/75"
          >
            <Send
              className="absolute top-2 right-2 hover:text-white cursor-pointer"
              onClick={() => {
                navigate('/home/inbox')
              }}
            />
            <div className="font-semibold">{recomm.username}</div>
            <div className="text-sm text-gray-400">{recomm.email}</div>
            <div className="mt-2">
              <div className="relative flex flex-wrap gap-2 w-30">
                {recomm.Interests.map((interest, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 bg-neutral-700/100 rounded text-sm 
                               hover:text-white hover:bg-neutral-800 cursor-none 
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
