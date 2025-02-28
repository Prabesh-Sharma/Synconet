import { useRecording } from "./Recording";

const VideoRecorder = ({ stream }) => {
  const { startRecording, stopRecording, isRecording } = useRecording();

  return (
    <div>
      <button onClick={() => startRecording(stream)} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
    </div>
  );
};

export default VideoRecorder;
