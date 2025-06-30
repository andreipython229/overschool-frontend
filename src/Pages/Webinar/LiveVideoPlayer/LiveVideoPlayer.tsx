import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import styles from "./../Livestream/Livestream.module.scss";

interface Props {
  videoId: string;
  onReady: (player: YouTubePlayer) => void;
  seekToSeconds?: number;
}

export const LiveVideoPlayer: React.FC<Props> = ({ videoId, onReady, seekToSeconds }) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOverlay(false);
    }, 5500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const enableSound = () => {
      const player = playerRef.current;
      if (player) {
        player.unMute();
        document.removeEventListener('click', enableSound);
      }
    };

    document.addEventListener('click', enableSound);
    return () => {
      document.removeEventListener('click', enableSound);
    };
  }, []);

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      disablekb: 1,
      fs: 0,
      mute: 1,
      iv_load_policy: 3,
    },
  };

  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', overflow: 'hidden'}}>
      {showOverlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            zIndex: 2,
          }}
        />
      )}
      <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <YouTube
            videoId={videoId}
            opts={opts}
            iframeClassName={styles.youtubeIframe}
            onReady={(e) => {
              const player = e.target;
              playerRef.current = player;
              if (seekToSeconds != null) {
                player.seekTo(seekToSeconds, true);
              }
              player.playVideo();
              player.setPlaybackQuality('hd720');
              onReady(player);
            }}
            onStateChange={(event) => {
              if (event.data === 2) {
                event.target.playVideo();
              }
            }}
          />
      </div>
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
      }} />
    </div>
  );
};
