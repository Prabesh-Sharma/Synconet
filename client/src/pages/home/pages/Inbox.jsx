import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { SendIcon } from 'lucide-react'
import axios from '../../../../axiosConfig.js'
import Layout from '../components/Layout'
import Messages from './Messages'
import { useAuth } from '../../../context/AuthContext'

const Inbox = () => {
  const location = useLocation()
  const { profilePicture, username: receiverUsername } = location.state || {}
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { username } = useAuth()

  const fetchMessages = useCallback(async () => {
    if (!username || !receiverUsername) return

    try {
      // Fetch messages in both directions
      const [sentMessages, receivedMessages] = await Promise.all([
        axios.get(`/api/messages/${username}/${receiverUsername}`),
        axios.get(`/api/messages/${receiverUsername}/${username}`),
      ])

      // Combine messages from both directions
      const allMessages = [
        ...(sentMessages.data || []),
        ...(receivedMessages.data || []),
      ]

      // Remove duplicates based on _id
      const uniqueMessages = allMessages.filter(
        (message, index, self) =>
          index === self.findIndex((m) => m._id === message._id)
      )

      setMessages(uniqueMessages)
      setError(null)
    } catch (error) {
      // Handle 204 No Content separately
      if (error.response?.status === 204) {
        setMessages([])
        return
      }
      setError('Failed to fetch messages. Please try again later.')
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [username, receiverUsername])

  useEffect(() => {
    if (!receiverUsername) return

    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)

    return () => clearInterval(interval)
  }, [fetchMessages, receiverUsername])

  const handleMessageSubmission = async () => {
    if (!message.trim()) return

    const newMessage = {
      sender: username,
      receiver: receiverUsername,
      message: message.trim(),
    }

    try {
      const response = await axios.post('/api/messages', newMessage)
      setMessage('')
      // Add the new message to the existing messages
      setMessages((prev) => [...prev, response.data])
    } catch (error) {
      setError('Failed to send message. Please try again.')
      console.error('Error sending message:', error)
    }
  }

  if (!receiverUsername) {
    return <Navigate to="/chat" replace />
  }

  return (
    <Layout>
      <Layout.Header>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-neutral-200">Messages</h1>
        </div>
      </Layout.Header>
      <Layout.Main className="justify-center">
        <div className="flex h-[100%] w-[100%] overflow-x-auto scrollbar-none border-b-2 border-b-[#3d3d3d] justify-center">
          <div className="flex w-auto min-w-[150px] text-lg mx-5 my-5 bg-gray-600 p-3 items-center rounded-[50px] overflow-hidden text-green-300">
            <img
              src={profilePicture || '/default-avatar.png'}
              className="w-[35px] h-[35px] rounded-[50%] object-cover"
              alt={`${receiverUsername}'s profile`}
              onError={(e) => {
                e.target.src = '/default-avatar.png'
              }}
            />
            <div className="mx-2 truncate">{receiverUsername}</div>
          </div>
        </div>

        {error && (
          <div className="text-center text-red-500 mt-4 mb-4 p-2 rounded bg-red-500/10">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-white mt-4">
            <div className="animate-pulse">Loading messages...</div>
          </div>
        ) : (
          <Messages
            messages={messages}
            currentUser={username}
            otherUser={receiverUsername}
          />
        )}

        <div className="flex justify-center">
          <div className="flex justify-center items-center h-auto mb-[30px] w-[70%] border-2 rounded-2xl border-gray-600">
            <input
              value={message}
              className="text-white w-[93%] outline-none h-[40px] bg-transparent rounded-xl p-7"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && !e.shiftKey && handleMessageSubmission()
              }
              placeholder={`Message ${receiverUsername}...`}
              disabled={loading}
            />
            <button
              onClick={handleMessageSubmission}
              disabled={loading || !message.trim()}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <SendIcon
                size={30}
                className={`text-green-300 ${
                  loading || !message.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-110 transition-transform'
                }`}
              />
            </button>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Inbox
