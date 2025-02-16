import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../../../context/AuthContext'
import { KeyRound, Upload } from 'lucide-react'
import axios from '../../../../axiosConfig.js'
import Input from '../../auth/form/components/Input.jsx'

const Profile = () => {
  const { username, email, profilePic } = useAuth()
  const token = localStorage.getItem('token')
  const [data, setData] = useState({ newpw: '', oldpw: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const response = await axios.post(
        '/api/user/changepass',
        { oldPassword: data.oldpw, newPassword: data.newpw },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setData({ newpw: '', oldpw: '' })
      if (response.status === 200) {
        setMessage('Password reset sucessful')
      }
    } catch (e) {
      console.log(e)
      if (e.status === 404) {
        setMessage('Password reset unsucessful')
      } else {
        setMessage('unexpected error occured')
      }
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      console.error('No file selected')
      return
    }

    const formData = new FormData()
    formData.append('profilePic', file)

    try {
      const response = await axios.post(
        '/api/user/uploadprofilepic',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('File uploaded successfully:', response.data)
    } catch (error) {
      console.error(
        'Error uploading file:',
        error.response?.data || error.message
      )
    }
  }
  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Personal Info</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="border-neutral-500/50 w-full bg-neutral-800/20 rounded border text-white p-2 ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              {profilePic ===
              'https://as2.ftcdn.net/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' ? (
                <div
                  className="
              rounded-full size-20 bg-gradient-to-br from-blue-500 
              to-blue-700 flex items-center 
              justify-center cursor-pointer relative hover:opacity-85"
                >
                  <Upload className="size-16 stroke-1" />
                  <input
                    type="file"
                    name="profilePic"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full overflow-hidden text-[0px]"
                    onChange={handleUpload}
                  />
                </div>
              ) : (
                <img src={profilePic} className="size-20 rounded-full" />
              )}
              <div className="flex flex-col ml-5 mt-2">
                <div>{username}</div>
                <div>{email}</div>
              </div>
            </div>
            <div>
              {profilePic !==
                'https://as2.ftcdn.net/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' && (
                <button
                  className="relative flex flex-row rounded-md py-1 px-2 gap-1 border-2 
                         bg-neutral-500/20 border-neutral-400 hover:text-neutral-100 hover:border-neutral-100 mt-4 mr-4"
                >
                  Update Photo
                  <input
                    type="file"
                    name="profilePic"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full overflow-hidden text-[0px]"
                    onChange={handleUpload}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col p-5">
            <div className="cursor-default font-semibold text-xl flex flex-row gap-2">
              <KeyRound />
              Password
            </div>
            <div className="text-sm text-slate-400">
              modify or change your password
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-start gap-10 mb-4">
                <Input
                  placeholder="Old Password"
                  type="password"
                  name="oldpw"
                  id="oldpw"
                  value={data.oldpw}
                  onChange={handleChange}
                />
                <Input
                  placeholder="New Password"
                  type="password"
                  name="newpw"
                  id="newpw"
                  value={data.newpw}
                  onChange={handleChange}
                />
                {message && (
                  <div
                    className={`mt-8 italic text-base ml-9 ${
                      message.includes('unsucessful')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
              <button
                className="rounded-md border-2 py-1 px-2 
                         bg-neutral-500/20 border-neutral-400 hover:text-neutral-100 hover:border-neutral-100"
                type="submit"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Profile
