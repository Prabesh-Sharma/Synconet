// src/services/socketServer.js

import { Server } from 'socket.io';

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer);

  let participants = []; // Track participants by their socket ID

  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('join-room', ({ roomId, username }) => {
      participants.push({ id: socket.id, username, roomId });
      socket.join(roomId);
      io.to(roomId).emit('participants', participants);
      console.log(`${username} joined room ${roomId}`);
    });

    socket.on('offer', ({ to, offer }) => {
      socket.to(to).emit('offer', { from: socket.id, offer });
    });

    socket.on('answer', ({ to, answer }) => {
      socket.to(to).emit('answer', { from: socket.id, answer });
    });

    socket.on('ice-candidate', ({ candidate, to }) => {
      socket.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    // Moderator: Mute a user
    socket.on('mute-user', ({ userId }) => {
      io.to(userId).emit('mute');
    });

    // Moderator: Kick a user
    socket.on('kick-user', ({ userId }) => {
      io.to(userId).emit('kick');
      socket.to(userId).disconnect();
      participants = participants.filter((p) => p.id !== userId);
      io.to(userId).emit('user-left');
      io.to(socket.id).emit('participants', participants); // Update remaining participants list
    });

    // Hand Raise Event
    socket.on('hand-raise', ({ username, roomId }) => {
      io.to(roomId).emit('hand-raise-notification', { username });
    });

    // Approve Hand Raise
    socket.on('approve-hand-raise', ({ peerId }) => {
      io.to(peerId).emit('hand-raise-approved');
    });

    // Disapprove Hand Raise
    socket.on('disapprove-hand-raise', ({ peerId }) => {
      io.to(peerId).emit('hand-raise-disapproved');
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected: ' + socket.id);
      participants = participants.filter((p) => p.id !== socket.id);
      io.to(socket.id).emit('user-left');
      io.emit('participants', participants); // Update all participants when someone leaves
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
