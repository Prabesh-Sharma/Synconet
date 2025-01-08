/**
 * This is a mesh implementation of web-rtc api
 * Everytime a new user joins he creates 2n new connections in total(n being the total number of existing participants)
 * There are a total of n*(n-1)/2 total connections for n participants
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../../../context/SocketContext'
import { Mic, MicOff, Video, VideoOff } from 'lucide-react'

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
}

const VideoChat = () => {
  const localStreamRef = useRef()
  const [roomId, setRoomId] = useState('')
  const socket = useSocket()
  const pcRef = useRef(new Map()) // participantId --> pc
  const [peers, setPeers] = useState(new Map()) // participantId --> MediaStream
  const [userName, setUserName] = useState(new Map())
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)

  const getLocalMediaStream = async () => {
    try {
      /*gets local MediaStream*/
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      })
      localStreamRef.current = mediaStream
      return mediaStream
    } catch (e) {
      console.log(e)
    }
  }

  /*useCallback used to maintain same reference across re-renders*/
  const createPeerConnection = useCallback((participantId) => {
    const pc = new RTCPeerConnection()
    pcRef.current.set(participantId, pc)

    /* .getTracks returns an array of tracks for eg: videoTrack and audioTrack */
    const tracks = localStreamRef.current.getTracks()

    tracks.forEach((track) => {
      pc.addTrack(track, localStreamRef.current) //track added to from localMediaStream
    })

    //gets triggered whenever the current user gets streams from the remote
    //stream.getAudioTracks() or stream.getVideoTracks() can also be called
    pc.ontrack = (e) => {
      const stream = e.streams[0]
      //!!!solved---->returned new map after adding to prev to trigger re-render
      setPeers((prev) => {
        return new Map(prev.set(participantId, stream))
      })
    }

    /*this triggers whenever a new ice-candidate is found || e.candidate contains infos like ip-addr*/
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        //ice-candidate event gets triggered in backend
        socket.emit('ice-candidate', {
          candidate: e.candidate,
          to: participantId,
        })
      }
    }

    return pc
  }, [])

  const handleJoin = async () => {
    if (!roomId) return

    const localMediaStream = await getLocalMediaStream()
    if (!localMediaStream) return

    socket.emit('join-room', roomId) //socket.join() in the backend for socket.id gets called

    socket.on('participants', async (participants) => {
      for (const participantId of participants) {
        const pc = createPeerConnection(participantId) //peer-connection created by existing users or socketIds in room

        //each peer existing creates an offer
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)

        //emit offer to newly joined peer
        socket.emit('offer', { to: participantId, offer })
      }
    })

    //existing user sets up a new connection for the newly joined user
    socket.on('new-user-joined', (id) => {
      createPeerConnection(id)
    })

    //the peers one by one get an offer from the newly joined user
    socket.on('offer', async ({ from, offer }) => {
      const pc = pcRef.current.get(from)
      pc.setRemoteDescription(offer)
      const answer = await pc.createAnswer()
      pc.setLocalDescription(answer)

      socket.emit('answer', {
        to: from,
        answer,
      })
    })

    socket.on('answer', async ({ from, answer }) => {
      const pc = pcRef.current.get(from)
      if (pc) {
        pc.setRemoteDescription(answer)
      }
    })

    socket.on('ice-candidate', async ({ from, candidate }) => {
      const pc = pcRef.current.get(from)
      if (pc) {
        await pc.addIceCandidate(candidate)
      }
    })
  }

  useEffect(() => {
    setRoomId(1)
  }, [])

  useEffect(() => {
    if (roomId) {
      handleJoin()
    }
  }, [roomId])

  const handleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
  }

  const handleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
  }

  return (
    <>
      <div className="relative w-full h-screen">
        <div className="grid grid-cols-4 gap-4">
          {localStreamRef.current && (
            <div className="relative">
              <video
                ref={(video) => {
                  if (video) video.srcObject = localStreamRef.current
                }}
                autoPlay
                playsInline
                className="w-full scale-x-[-1] rounded-md"
              />
              <span className="bg-black opacity-50 absolute bottom-2 right-2 text-white p-1 rounded-md">
                you
              </span>
            </div>
          )}
          {Array.from(peers.entries()).map(([peerId, stream]) => (
            <div key={peerId} className="relative p-2">
              <video
                className="w-full scale-x-[-1] rounded-md"
                playsInline
                autoPlay
                ref={(video) => {
                  video.srcObject = stream || localStreamRef.current
                }}
              />
              <span className="bg-black opacity-50 absolute bottom-2 right-2 text-white p-1 rounded-md">
                {peerId.slice(0, 5)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-[50%] absolute bottom-4 text-white">
        <div className="grid grid-cols-2 gap-3 justify-between cursor-pointer">
          <div onClick={handleAudio}>
            {isAudioEnabled ? <Mic /> : <MicOff />}
          </div>
          <div onClick={handleVideo}>
            {isVideoEnabled ? <Video /> : <VideoOff />}
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoChat
