// Messages.jsx
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Messages = ({ messages, currentUser, otherUser }) => {
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Combine and sort messages from both users
  const sortedMessages = React.useMemo(() => {
    return messages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="h-[500px] overflow-auto w-full bg-transparent text-white flex flex-col px-4"
      style={{ scrollBehavior: 'smooth' }}
    >
      {!sortedMessages.length ? (
        <div className="text-center text-gray-400 mt-10 h-full flex items-end justify-center pb-8">
          Start a conversation
        </div>
      ) : (
        sortedMessages.map((message) => (
          <div
            key={message._id}
            className={`flex flex-col ${
              message.sender === currentUser ? 'items-end' : 'items-start'
            } mb-4`}
          >
            <div
              className={`max-w-[70%] break-words px-4 py-2 rounded-xl ${
                message.sender === currentUser
                  ? 'bg-blue-600 rounded-br-none'
                  : 'bg-[#3d3d3d] rounded-bl-none'
              }`}
            >
              {message.message}
            </div>
            <span className="text-xs text-gray-400 mt-1 px-2">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      receiver: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  currentUser: PropTypes.string.isRequired,
  otherUser: PropTypes.string.isRequired,
}

export default Messages
