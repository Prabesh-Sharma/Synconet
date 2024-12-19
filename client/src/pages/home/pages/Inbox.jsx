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
        <div className="p-4 flex flex-col justify-center items-center border border-neutral-500/50 bg-neutral-800/20 rounded w-full max-w-md sm:max-w-lg">
          <div className="text-[50px] text-white mb-4">Messenger</div>

          {/* Message Display Area */}
          <div className="h-[300px] w-full flex flex-col overflow-y-auto bg-neutral-900 rounded p-2 sm:h-[400px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-neutral-700 text-white p-2 rounded mb-2 self-start max-w-[80%] break-words sm:max-w-[70%]"
              >
                {msg}
              </div>
            ))}
            {/* This div ensures we scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex w-full mt-4 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-neutral-500 bg-neutral-800 text-white rounded-l overflow-hidden sm:max-h-[48px]"
              style={{ wordBreak: 'break-word' }}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r flex items-center justify-center"
            >
              <audio
                ref={audioRef}
                src="/discord-notification.mp3"
                preload="auto"
              />
              <PaperAirplaneIcon className="h-5 w-5 transform" />
            </button>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Inbox
