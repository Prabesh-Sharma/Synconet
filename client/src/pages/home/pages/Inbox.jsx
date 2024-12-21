import React, { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const audioRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Handles sending a new message
  const handleSendMessage = () => {
    audioRef.current.play()
    if (!message.trim()) return // Prevent sending empty messages
    setMessages([...messages, message])
    setMessage('') // Clear the input field
  }

  // Scrolls to the bottom of the message container when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Handle key press (Enter key) to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent the default action (new line)
      handleSendMessage() // Send the message when Enter is pressed
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Inbox</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="text-xl text-neutral-200">main content is here</div>
      </Layout.Main>
    </Layout>
  )
}

export default Inbox
