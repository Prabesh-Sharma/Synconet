import React from 'react'
import moment from 'moment'
import messages from '../../../../utils/messages.json'

function Messages(props) {
  const ram = messages.filter(
    (e) => e.sender === props.username && e.receiver === props.myName
  )
  const hari = messages.filter(
    (e) => e.sender === props.myName && e.receiver === props.username
  )
  const AllMsg = [...ram, ...hari]

  const sortedMessage = AllMsg.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  )

  return (
    <div
      className={`h-[500px] overflow-auto w-full bg-transparent text-white flex flex-col ${
        sortedMessage.length === 0 ? 'justify-end' : 'justify-center '
      }`}
      style={{ scrollBehavior: ' smooth' }}
    >
      {sortedMessage.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 h-full justify-center self-end">
          Nothing to show
        </div>
      ) : (
        sortedMessage.map((e) => (
          <React.Fragment key={e.id}>
            <span
              className={`h-[30px] bg-[#3d3d3d] m-3 ${
                e.sender === props.myName ? 'self-end' : 'self-start'
              } rounded-xl px-5`}
            >
              {e.message}
            </span>
            <span
              className={`h-[30px] text-xs text-purple-500 m-0 ${
                e.sender === props.myName ? 'self-end' : 'self-start'
              } rounded-xl px-5`}
            >
              {moment(e.timestamp).fromNow()} ago
            </span>
          </React.Fragment>
        ))
      )}
    </div>
  )
}

export default Messages
