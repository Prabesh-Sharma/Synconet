/**
 * This is a mesh implementation of web-rtc api
 * Everytime a new user joins he creates 2n new connections in total(n being the total number of existing participants)
 * There are a total of n*(n-1)/2 total connections for n participants
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSocket } from '../../../context/SocketContext';
import { Mic, MicOff, PhoneMissed, Video, VideoOff, StopCircle, Circle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { useRecording } from './Recording';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

const VideoChat = () => {
  const localStreamRef = useRef();
  const { id } = useParams();
  const [roomId, setRoomId] = useState('');
  const socket = useSocket();
  const pcRef = useRef(new Map()); // participantId --> pc
  const [peers, setPeers] = useState(new Map()); // participantId --> {stream, usr}
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const { username } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const { startRecording, stopRecording } = useRecording();

  const getLocalMediaStream = async () => {
    try {
      /*gets local MediaStream*/
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current = mediaStream;
      return mediaStream;
    } catch (e) {
      console.log(e);
    }
  };

  const createPeerConnection = useCallback((participantId, user) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    pcRef.current.set(participantId, pc);

    /* .getTracks returns an array of tracks for eg: videoTrack and audioTrack */
    const tracks = localStreamRef.current.getTracks();
    tracks.forEach((track) => {
      pc.addTrack(track, localStreamRef.current); //track added to from localMediaStream // MEDIASTREAM ---> multiple tracks
    });

    pc.ontrack = (e) => {
      const stream = e.streams[0];
      setPeers((prev) => {
        const newPeers = new Map(prev);
        newPeers.set(participantId, { stream, usr: user });
        return newPeers;
      });
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('ice-candidate', {
          candidate: e.candidate,
          to: participantId,
        });
      }
    };

    return pc;
  }, []);

  const handleJoin = async () => {
    if (!roomId) return;

    const localMediaStream = await getLocalMediaStream();
    if (!localMediaStream) return;

    socket.emit('join-room', { roomId, username });

    socket.on('participants', async (participants) => {
      for (const participant of participants) {
        const pc = createPeerConnection(participant.id, participant.username);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { to: participant.id, offer });
      }
    });

    socket.on('new-user-joined', ({ id, username }) => {
      createPeerConnection(id, username);
    });

    socket.on('offer', async ({ from, offer }) => {
      const pc = pcRef.current.get(from);
      pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      pc.setLocalDescription(answer);
      socket.emit('answer', {
        to: from,
        answer,
      });
    });

    socket.on('answer', async ({ from, answer }) => {
      const pc = pcRef.current.get(from);
      if (pc) {
        pc.setRemoteDescription(answer);
      }
    });

    socket.on('ice-candidate', async ({ from, candidate }) => {
      const pc = pcRef.current.get(from);
      if (pc) {
        await pc.addIceCandidate(candidate);
      }
    });

    socket.on('user-left', (participantId) => {
      cleanupPeerConnection(participantId);
    });

    return () => {
      socket.off('participants');
      socket.off('new-user-joined');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('user-left');
    };
  };

  const cleanupPeerConnection = useCallback((participantId) => {
    const pc = pcRef.current.get(participantId);
    if (pc) {
      pc.close();
      pcRef.current.delete(participantId);
      setPeers((prev) => {
        const newPeers = new Map(prev);
        newPeers.delete(participantId);
        return newPeers;
      });
    }
  }, []);

  useEffect(() => {
    if (username) {
      setRoomId(id);
    }
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      pcRef.current.forEach((pc, participantId) => {
        cleanupPeerConnection(participantId);
      });

      setPeers(new Map());
    };
  }, [username]);

  useEffect(() => {
    if (roomId) {
      const cleanSocketEvents = handleJoin();
      return () => {
        cleanSocketEvents?.();
      };
    }
  }, [roomId]);

  const handleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);

        pcRef.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === 'video');
          if (sender) {
            sender.track.enabled = !isVideoEnabled;
          }
        });
      }
    }
  };
  const handleRecording = () => {
    if (!isRecording) {
      console.log('Starting recording...');
      startRecording(localStreamRef.current); // Simply call startRecording
    } else {
      console.log('Stopping recording...');
      stopRecording(); // Just call stopRecording without passing mediaRecorder
    }
    setIsRecording(!isRecording); // Toggle the recording state
  };
  
  
  const handleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);

        pcRef.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === 'audio');
          if (sender) {
            sender.track.enabled = !isAudioEnabled;
          }
        });
      }
    }
  };

  return (
    <>
      <div className="relative w-full h-screen">
        <div className="grid grid-cols-4 gap-4">
          {localStreamRef.current && (
            <div className="relative">
              <video
                ref={(video) => {
                  if (video) video.srcObject = localStreamRef.current;
                }}
                autoPlay
                muted
                playsInline
                className="w-full scale-x-[-1] rounded-md"
              />
              <span className="bg-black opacity-50 absolute bottom-2 right-2 text-white p-1 rounded-md">
                {username}(you)
              </span>
            </div>
          )}
          {Array.from(peers.entries()).map(([peerId, peerData]) => (
            <div key={peerId} className="relative p-2">
              <video
                className="w-full scale-x-[-1] rounded-md"
                playsInline
                autoPlay
                ref={(video) => {
                  if (video) video.srcObject = peerData.stream;
                }}
              />
              <span className="bg-black opacity-50 absolute bottom-2 right-2 text-white p-1 rounded-md">
                {peerData.usr}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-[50%] absolute bottom-4 text-white">
        <div className="flex gap-3 justify-between cursor-pointer">
          <div onClick={handleAudio} className="relative group">
            {isAudioEnabled ? <Mic /> : <MicOff />}
            <div className="cursor-default absolute px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity bottom-8 right-[1px]">
              {isAudioEnabled ? 'mute' : 'unmute'}
            </div>
          </div>
          <div onClick={handleVideo} className="group relative">
            {isVideoEnabled ? <Video /> : <VideoOff />}
            <div className="cursor-default absolute px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity bottom-8 right-[1px]">
              {isVideoEnabled ? 'Turn Video Off' : 'Turn Video On'}
            </div>
          </div>
          <div onClick={handleRecording} className="group relative">
            {isRecording ? <StopCircle color="red" /> : <Circle color="red" />}
            <div className="cursor-default absolute px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity bottom-8 right-[1px]">
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </div>
          </div>
          <div
            className="group relative"
            onClick={() => (window.location.href = '/home/events')}
          >
            <PhoneMissed />
            <div className="cursor-default absolute px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity bottom-8 right-[1px]">
              End Call
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoChat;
