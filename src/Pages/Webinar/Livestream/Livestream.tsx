import React, { useEffect, useRef, useState } from 'react';
import { LiveVideoPlayer } from './../LiveVideoPlayer/LiveVideoPlayer';
import { InternalVideoPlayer } from './../InternalVideoPlayer/InternalVideoPlayer';
import { TimedComments } from './../TimedComments/TimedComments';
import { UserComments } from './../UserComments/UserComments';
import { YouTubePlayer } from 'react-youtube';
import { TimedComment } from './../types/comment';
import { PublicWebinarCountdown, PublicWebinarLive, PublicWebinarEnded, ChatMessage } from 'types/autowebinarsT'
import { nanoid } from 'nanoid';
import styles from "./Livestream.module.scss";

interface LiveStreamProps {
  videoId?: string;
  uploadedVideoUrl?: string;
  status: 'countdown' | 'live' | 'ended';
  message?: string;
  predefinedComments: TimedComment[];
  scheduledStartTime: string;
  videoOffsetSeconds?: number;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ videoId, predefinedComments, uploadedVideoUrl, status, message, scheduledStartTime, videoOffsetSeconds }) => {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [userComments, setUserComments] = useState<TimedComment[]>([]);
  const expectedTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(videoOffsetSeconds ?? 0);

  useEffect(() => {
    if (status !== 'live') return;

    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);


  const startTimestamp = Date.parse(scheduledStartTime);
  useEffect(() => {
    if (!player || status !== 'live') return;

    player.seekTo(videoOffsetSeconds, true);
  }, [player, status, videoOffsetSeconds]);


  const handleUserComment = (text: string) => {
    if (!player) return;
    const time = Math.floor(player.getCurrentTime());
    setUserComments(prev => [
      ...prev,
      {
        id: nanoid(),
        text,
        time,
        username: 'Вы',
        role: 'guest'
      },
    ]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_player}>
        {status !== 'live' ? (
          <div className={styles.container_player_message}>
            {message || 'Эфир скоро начнётся...'}
          </div>
        ) : videoId? ( <LiveVideoPlayer videoId={videoId} onReady={setPlayer} seekToSeconds={videoOffsetSeconds}/>)
          : uploadedVideoUrl? (<InternalVideoPlayer uploadedVideoUrl={uploadedVideoUrl} seekToSeconds={videoOffsetSeconds} onReady={setPlayer} />)
          : null
        }
      </div>

      {status === 'live' && (
        <div className={styles.container_comments}>
          <TimedComments
            currentTime={currentTime}
            predefinedComments={predefinedComments}
            userComments={userComments}
          />
          <UserComments onAddComment={handleUserComment} />
        </div>
      )}
    </div>
  );
};