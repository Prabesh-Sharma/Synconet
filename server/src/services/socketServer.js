import { Server } from 'socket.io'

const room = new Map()

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  const removeParticipantFromRoom = (socketId, roomId) => {
    const people = room.get(roomId)
    if (people) {
      people.filter((id) => id !== socketId)
      if (people.length === 0) {
        room.delete(roomId)
      } else {
        room.set(roomId, people)
      }
    }
  }

  io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('message', ({ message }) => {
      console.log(message)
    })

    socket.on('join-room', (roomId) => {
      socket.join(roomId)

      const participants = room.get(roomId) || []
      socket.emit('participants', participants)

      if (!participants.includes(socket.id)) {
        participants.push(socket.id)
      }

      room.set(roomId, participants)
      socket.to(roomId).emit('new-user-joined', socket.id)
      socket.roomId = roomId
    })

    socket.on('offer', ({ to, offer }) => {
      socket.to(to).emit('offer', {
        offer,
        from: socket.id,
      })
    })

    socket.on('answer', ({ to, answer }) => {
      socket.to(to).emit('answer', {
        answer,
        from: socket.id,
      })
    })

    socket.on('ice-candidate', ({ to, candidate }) => {
      socket.to(to).emit('ice-candidate', {
        candidate,
        from: socket.id,
      })
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)

      if (socket.roomId) {
        removeParticipantFromRoom(socket.id, socket.roomId)

        socket.to(socket.roomId).emit('user-left', socket.id)
      }
    })
  })

  return () => {
    io.close()
    room.clear
  }
}

export default initializeSocket

/*
	room --> participant
	participant --> socketid
	rooms maps to room which is a set of participant(socket.id)
	get ice-candidates and emit
	get offer and emit
	get answer and emit
*/
