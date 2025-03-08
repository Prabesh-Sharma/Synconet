import { Server } from 'socket.io';
import cors from 'cors';

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',  // Frontend URL
      methods: ["GET", "POST"],
    },
  });

  let participants = []; // Track participants by their socket ID

  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    console.log('A user connected: ' + socket.id);

    socket.on('join-room', ({ roomId, username }) => {
      participants.push({ id: socket.id, username, roomId });
      socket.join(roomId);
      io.to(roomId).emit('participants', participants);
      console.log(`${username} joined room ${roomId}`);
    });
      participants.push({ id: socket.id, username, roomId });
      socket.join(roomId);
      io.to(roomId).emit('participants', participants);
      console.log(`${username} joined room ${roomId}`);
    });

    socket.on('offer', ({ to, offer }) => {
      socket.to(to).emit('offer', { from: socket.id, offer });
    });
      socket.to(to).emit('offer', { from: socket.id, offer });
    });

    socket.on('answer', ({ to, answer }) => {
      socket.to(to).emit('answer', { from: socket.id, answer });
    });

    socket.on('ice-candidate', ({ candidate, to }) => {
      socket.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    socket.on('new-event', (event) => {
      io.emit('new-event', { 
        message: event.message,  
        timestamp: new Date(), 
      });
    });    

    // Moderator: Mute a user
    socket.on('mute-user', ({ userId }) => {
      io.to(userId).emit('mute');
    });

    // Moderator: Kick a user
    socket.on('kick-user', ({ userId, roomId }) => {
      io.to(userId).emit('kick');
      socket.to(userId).disconnect();
      participants = participants.filter((p) => p.id !== userId);
      io.to(roomId).emit('participants', participants); // Update participants list in the room
      io.to(roomId).emit('user-left', { userId }); // Notify others
    });

    // Hand Raise Event
    socket.on('hand-raise', ({ username, roomId }) => {
      console.log(`${username} raised hand in room: ${roomId}`);
      io.to(roomId).emit('hand-raise-notification', { username });
    });

    // Handle thumbs-up event
    socket.on('thumbs-up', ({ username, roomId }) => {
      io.to(roomId).emit('thumbs-up-notification', { username });
    });

    // Handle thumbs-down event
    socket.on('thumbs-down', ({ username, roomId }) => {
      io.to(roomId).emit('thumbs-down-notification', { username });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('A user disconnected: ' + socket.id);
      const user = participants.find((p) => p.id === socket.id);
      if (user) {
        participants = participants.filter((p) => p.id !== socket.id);
        io.to(user.roomId).emit('participants', participants); // Update participants list
        io.to(user.roomId).emit('user-left', { userId: socket.id }); // Notify others
      }
    });
  });
};

export default initializeSocket;


/*
	room --> {participantId,username}
	participant --> socketid
	rooms maps to room which is a set of participant(socket.id)
	get ice-candidates and emit
	get offer and emit
	get answer and emit
*/