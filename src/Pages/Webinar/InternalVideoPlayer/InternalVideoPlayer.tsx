import React, { useEffect, useRef } from 'react'

interface VideoPlayerInterface {
  getCurrentTime: () => number
  seekTo: (seconds: number) => void
}

interface InternalVideoPlayerProps {
  uploadedVideoUrl: string
  seekToSeconds?: number
  onReady: (player: VideoPlayerInterface) => void
}

export const InternalVideoPlayer: React.FC<InternalVideoPlayerProps> = ({ uploadedVideoUrl, onReady, seekToSeconds }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleReady = () => {
      if (seekToSeconds != null) {
        video.currentTime = seekToSeconds
      }

      const fakePlayer: VideoPlayerInterface = {
        getCurrentTime: () => video.currentTime,
        seekTo: (seconds: number) => {
          video.currentTime = seconds
        },
      }

      onReady(fakePlayer)
    }
    if (video.readyState >= 1) {
      handleReady()
    } else {
      video.addEventListener('loadedmetadata', handleReady)
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleReady)
    }
  }, [seekToSeconds, onReady])

  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        controls={false}
        src={uploadedVideoUrl}
        autoPlay
        muted
        style={{ aspectRatio: '16 / 9', backgroundColor: 'black', width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={uploadedVideoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  )
}
