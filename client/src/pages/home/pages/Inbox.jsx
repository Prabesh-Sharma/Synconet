import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Users from '../../../../utils/users.json'
import '../../../index.css'
import Messages from './Messages'
import { useAuth } from '../../../context/AuthContext'
import { SendIcon } from 'lucide-react'

// import Input from './Input'
// import MessageBox from './MessageBox'

const Inbox = () => {
  const [active, setActive] = useState(Users[0])
  const [value, setValue] = useState('')
  const { username } = useAuth()

  const handleChange = (e) => {
    setValue(e)
  }

  const handleSubmission = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      setValue('')
    }
    // console.log(e.key)
  }
  const handleClickOnSent = () => {
    console.log(value)
    setValue('')
  }

  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Inbox</h1>
      </Layout.Header>
      <Layout.Main className="justify-center">
        <div className="flex h-[100%] w-[100%] overflow-x-auto scrollbar-none border-b-2 border-b-[#3d3d3d] justify-center">
          {Users.map((user) => (
            <div
              key={user.username}
              className={`flex w-[150px] flex-shrink-0 text-lg mx-5 my-5 bg-gray-600 p-3 items-center rounded-[50px] overflow-auto scrollbar-none cursor-pointer ${
                active.username === user.username
                  ? 'text-green-300'
                  : 'text-white'
              }`}
              onClick={() => setActive(user)}
            >
              <img src={user.pic} className="w-[35px] h-[35px] rounded-[50%]" />
              <div className="mx-2 w-[100%]">{user.username}</div>
            </div>
          ))}
        </div>

        <Messages
          username={active.username}
          myName={username}
          key={active.username}
        />
        <div className="flex justify-center">
          <div className="flex justify-center items-center h-auto mb-[30px] w-[70%] border-2 rounded-2xl  border-gray-600">
            <input
              value={value}
              className="text-white w-[93%] outline-none h-[40px] bg-transparent  rounded-xl p-7"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => handleSubmission(e)}
            />
            <SendIcon
              size={30}
              className="cursor-pointer "
              onClick={() => {
                handleClickOnSent()
              }}
            />
          </div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Inbox
