import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import {useGetPublicWebinarQuery, useGetPublicChatMessagesQuery} from "../../api/autowebinarsService";
import { LiveStream } from "Pages/Webinar/Livestream/Livestream"
import { PublicWebinarCountdown, PublicWebinarLive, PublicWebinarEnded, ChatMessage } from 'types/autowebinarsT'
import { nanoid } from 'nanoid';
import { TimedComment } from './types/comment';
import { skipToken } from "@reduxjs/toolkit/query/react";
import { InitPageHeader } from 'Pages/Initial/newInitialPageHeader'
import { Footer } from 'components/Footer/index'
import { BackgroundAnimation } from 'components/BackgroundAnimation'
import { motion } from 'framer-motion'
import styles from "./webinarPage.module.scss";

export default function WebinarPage() {
  const { slug } = useParams<{ slug: string }>();

  const {data: publicWebinarData, isSuccess: publicWebinarSuccess, error: publicWebinarError } = useGetPublicWebinarQuery({ slug: slug! });

  const playbackSessionId = (publicWebinarData && 'playback_session_id' in publicWebinarData)
    ? (publicWebinarData as PublicWebinarLive).playback_session_id
    : undefined;

  const {data: chatMessagesData, isSuccess: chatMessagesSuccess} = useGetPublicChatMessagesQuery(
    playbackSessionId ? { playback_session_id: playbackSessionId } : skipToken
  );

  const {
    message,
    videoId,
    videoType,
    uploadedVideoUrl,
    scheduledStartTime,
    videoOffsetSeconds,
  } = useMemo(() => {
    if (!publicWebinarData) return {};

    if (publicWebinarData.status === 'countdown') {
      const d = publicWebinarData as PublicWebinarCountdown;
      return {
        message: d.message,
        scheduledStartTime: d.countdown_to_utc_iso,
      };
    }

    if (publicWebinarData.status === 'live' || publicWebinarData.status === 'ended') {
      const d = publicWebinarData as PublicWebinarLive;
      return {
        videoId: d.youtube_video_id,
        videoType: d.video_type,
        uploadedVideoUrl: d.uploaded_video_url,
        scheduledStartTime: d.scheduled_show_time_utc,
        videoOffsetSeconds: d.video_start_offset_seconds,
      };
    }

    return {};
  }, [publicWebinarData]);

  const predefinedComments = chatMessagesData?.all_scripted_messages.map((msg: ChatMessage) => ({
    id: `${msg.username}-${msg.timeshift_ms}`,
    text: msg.message,
    time: Math.floor(msg.timeshift_ms / 1000),
    username: msg.username,
    role: msg.role,
  })) || [];

  return (
    <div className={styles.webinarPage}>
      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
        <div className={styles.bg_wrap2}></div>
        <div className={styles.bg_wrap3}></div>
        <div className={styles.bg_wrap4}></div>
      </div>
      <InitPageHeader />
      <BackgroundAnimation />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', minHeight: '100vh'}}>
        <div className={styles.wrapper_webinar}>
          {publicWebinarError && 'data' in publicWebinarError && (publicWebinarError.data as any)?.status === 'ended'
            ? <div style={{width: '100%', textAlign: 'center'}}>{(publicWebinarError.data as PublicWebinarEnded).error}</div>
            : null
          }

          {publicWebinarData?.status === 'live' ?
            (
              <LiveStream
                status={(publicWebinarData?.status ?? 'countdown') as 'countdown' | 'live' | 'ended'}
                message={message}
                videoId={videoId}
                uploadedVideoUrl={uploadedVideoUrl}
                videoOffsetSeconds={videoOffsetSeconds}
                scheduledStartTime={scheduledStartTime || new Date().toISOString()}
                predefinedComments={predefinedComments}
              />
            ) : publicWebinarData?.status === 'countdown' ? (
              <div style={{width: '100%', textAlign: 'center'}}> {(publicWebinarData as PublicWebinarCountdown)?.message} </div>
            ) : null
          }
        </div>
        <Footer />
      </div>
    </div>
  );
}
