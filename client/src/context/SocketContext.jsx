import React, { createContext, useMemo, useContext } from 'react'
import { io } from 'socket.io-client'
import { API_URL } from '../../constants'

const SocketContext = createContext(null)

export const useSocket = () => {
  const socket = useContext(SocketContext)
  if (!socket) {
    console.log('socket not initialized')
  }
  return socket
}

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(API_URL), [])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
