import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../../../context/AuthContext'
import { Upload } from 'lucide-react'

const Profile = () => {
  const { username, email } = useAuth()
  const handleUpload = () => {
    console.log('upload')
  }
  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Personal Info</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="border-neutral-500/50 w-full bg-neutral-800/20 rounded border text-white p-2">
          <div className="flex flex-row">
            <div
              className="
              rounded-full size-20 bg-gradient-to-br from-blue-500 
              to-blue-700 flex items-center 
              justify-center cursor-pointer relative hover:opacity-85"
              onClick={handleUpload}
            >
              <Upload className="size-16 stroke-1" />
              <input className="hidden" type="file" />
            </div>
            <div className="flex flex-col ml-5 mt-2">
              <div>{username}</div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Profile
