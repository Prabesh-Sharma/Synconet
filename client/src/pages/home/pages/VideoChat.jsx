import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../../../context/SocketContext'
import { RiRecordCircleLine } from 'react-icons/ri'

import {
  Download,
  Mic,
  MicOff,
  PhoneMissed,
  Video,
  VideoOff,
  Video as VideoRecord,
  StopCircle,
} from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { useParams } from 'react-router-dom'

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
}

const VideoChat = () => {
  const localStreamRef = useRef()
  const { id } = useParams()
  const [roomId, setRoomId] = useState('')
  const socket = useSocket()
  const pcRef = useRef(new Map()) // participantId --> pc
  const [peers, setPeers] = useState(new Map()) // participantId --> {stream,MediaStream}
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const { username } = useAuth()

  // Recording-related state and refs
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const recordedChunksRef = useRef([])
  const compositeStreamRef = useRef(null)

  const getLocalMediaStream = async () => {
    try {
      /*gets local MediaStream*/
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
      localStreamRef.current = mediaStream
      return mediaStream
    } catch (e) {
      console.log(e)
    }
  }

  /*useCallback used to maintain same reference across re-renders*/
  const createPeerConnection = useCallback((participantId, user) => {
    const pc = new RTCPeerConnection(ICE_SERVERS)
    pcRef.current.set(participantId, pc)

    /* .getTracks returns an array of tracks for eg: videoTrack and audioTrack */
    const tracks = localStreamRef.current.getTracks()

    tracks.forEach((track) => {
      pc.addTrack(track, localStreamRef.current) //track added to from localMediaStream // MEDIASTREAM ---> multiple tracks
    })

    //gets triggered whenever the current user gets streams from the remote
    //stream.getAudioTracks() or stream.getVideoTracks() can also be called
    pc.ontrack = (e) => {
      const stream = e.streams[0]
      //returned new map after adding to prev to trigger re-render
      setPeers((prev) => {
        return new Map(prev.set(participantId, { stream, usr: user }))
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

    socket.emit('join-room', { roomId, username }) //socket.join() in the backend for socket.id gets called

    socket.on('participants', async (participants) => {
      for (const participant of participants) {
        const pc = createPeerConnection(participant.id, participant.username) //peer-connection created by existing users or socketIds in room
        console.log(participant.username)

        //each peer existing creates an offer
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)

        //emit offer to newly joined peer
        socket.emit('offer', { to: participant.id, offer })
      }
    })

    //existing user sets up a new connection for the newly joined user
    socket.on('new-user-joined', ({ id, username }) => {
      createPeerConnection(id, username)
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

    socket.on('user-left', (participantId) => {
      cleanupPeerConnection(participantId)
    })

    return () => {
      socket.off('answer')
      socket.off('offer')
      socket.off('ice - candidate')
      socket.off('new-user-joined')
      socket.off('user-left')
    }
  }

  const cleanupPeerConnection = useCallback((participantId) => {
    const pc = pcRef.current.get(participantId)
    if (pc) {
      pc.close()
      pcRef.current.delete(participantId)
      setPeers((prev) => {
        const newPeers = new Map(prev)
        newPeers.delete(participantId)
        return newPeers
      })
    }
  }, [])

  useEffect(() => {
    if (username) {
      setRoomId(id)
    }
    console.log(id)
    return () => {
      // Stop recording if active when component unmounts
      if (isRecording) {
        stopRecording()
      }

      // Stop all local tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Close all peer connections
      pcRef.current.forEach((pc, participantId) => {
        cleanupPeerConnection(participantId)
      })

      // Clear all state
      setPeers(new Map())
    }
  }, [username])

  useEffect(() => {
    if (roomId) {
      const cleanSocketEvents = handleJoin()
      return () => {
        cleanSocketEvents?.()
      }
    }
  }, [roomId, username])

  const handleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled
        setIsVideoEnabled(!isVideoEnabled)

        // Update the track for all peer connections
        pcRef.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === 'video')
          if (sender) {
            sender.track.enabled = !isVideoEnabled
          }
        })
      }
    }
  }

  const handleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled
        setIsAudioEnabled(!isAudioEnabled)

        // Update the track for all peer connections
        pcRef.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === 'audio')
          if (sender) {
            sender.track.enabled = !isAudioEnabled
          }
        })
      }
    }
  }

  // Function to create a composite stream from all video elements
  const createCompositeStream = () => {
    // Create a canvas element to draw all videos
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Set canvas size based on the number of participants
    const totalParticipants = peers.size + 1 // Include local stream

    // Set a reasonable size for the canvas
    const canvasWidth = 1280
    const canvasHeight = 720
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Compute grid layout
    let cols = 2
    if (totalParticipants > 4) cols = 3
    if (totalParticipants > 9) cols = 4

    const rows = Math.ceil(totalParticipants / cols)
    const cellWidth = canvasWidth / cols
    const cellHeight = canvasHeight / rows

    // Get all video elements (local + peers)
    const videoElements = Array.from(document.querySelectorAll('video'))

    // Animation function to draw videos to canvas
    const drawVideosToCanvas = () => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      videoElements.forEach((video, index) => {
        if (video.srcObject) {
          const row = Math.floor(index / cols)
          const col = index % cols
          const x = col * cellWidth
          const y = row * cellHeight

          ctx.drawImage(video, x, y, cellWidth, cellHeight)

          // Draw participant name
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
          ctx.fillRect(x + 5, y + cellHeight - 25, cellWidth - 10, 20)
          ctx.fillStyle = '#FFFFFF'
          ctx.font = '14px Arial'

          // Get username from video container
          const videoContainer = video.closest('div')
          const usernameElement = videoContainer?.querySelector('span')
          const username = usernameElement?.textContent || `User ${index + 1}`

          ctx.fillText(username, x + 10, y + cellHeight - 10)
        }
      })

      animationId = requestAnimationFrame(drawVideosToCanvas)
    }

    let animationId = requestAnimationFrame(drawVideosToCanvas)

    // Create a stream from the canvas
    const canvasStream = canvas.captureStream(30) // 30 FPS

    // Add audio tracks from all participants
    const audioTracks = []

    // Add local audio if enabled
    if (localStreamRef.current) {
      const localAudioTracks = localStreamRef.current.getAudioTracks()
      if (localAudioTracks.length > 0 && isAudioEnabled) {
        audioTracks.push(localAudioTracks[0])
      }
    }

    // Add peer audio tracks
    peers.forEach(({ stream }) => {
      const peerAudioTracks = stream.getAudioTracks()
      if (peerAudioTracks.length > 0) {
        audioTracks.push(peerAudioTracks[0])
      }
    })

    // Add audio tracks to canvas stream
    audioTracks.forEach((track) => {
      canvasStream.addTrack(track)
    })

    // Store cleanup function
    const cleanup = () => {
      cancelAnimationFrame(animationId)
    }

    return { stream: canvasStream, cleanup }
  }

  // Function to start recording
  const startRecording = () => {
    try {
      // Create a composite stream from all videos
      const { stream, cleanup } = createCompositeStream()
      compositeStreamRef.current = { stream, cleanup }

      // Set up MediaRecorder with the composite stream
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: 3000000, // 3 Mbps for good quality
      })

      mediaRecorderRef.current = mediaRecorder
      recordedChunksRef.current = []

      // Event handler for data available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      // Event handler for recording stopped
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' })

        // Create a download link
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        a.href = url
        a.download = `call-recording-${roomId}-${timestamp}.webm`
        a.style.display = 'none'

        // Add to DOM and trigger download
        document.body.appendChild(a)
        a.click()

        // Clean up
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 100)

        // Clean up composite stream
        if (compositeStreamRef.current) {
          compositeStreamRef.current.cleanup()
          compositeStreamRef.current = null
        }
      }

      // Start recording in 1-second chunks
      mediaRecorder.start(1000)
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  // Function to stop recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
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
                muted={true}
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
                  if (video) video.srcObject = peerData.stream
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
          <div onClick={toggleRecording} className="group relative">
            {isRecording ? (
              <StopCircle color="red" />
            ) : (
              <RiRecordCircleLine className="size-6" />
            )}
            <div className="cursor-default absolute px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity bottom-8 right-[1px]">
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </div>
            {isRecording && (
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
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
  )
}

export default VideoChat
