export type PublicWebinarCountdown = {
  status: string;
  message: string;
  countdown_to_utc_iso: string;
  webinar_title: string;
  description: string;
};

export type PublicWebinarEnded = {
  status: string;
  error: string;
};

export type PublicWebinarLive = {
  id: number;
  title: string;
  description: string;
  video_type: string;
  youtube_video_id: string;
  uploaded_video_url: string;
  school_name: string;
  has_chat: boolean;
  duration_minutes: number;
  status: string;
  playback_session_id: number;
  chat_enabled: boolean;
  scheduled_show_time_utc: string;
  video_start_offset_seconds: number;
};

export type PublicWebinar = PublicWebinarCountdown | PublicWebinarLive | PublicWebinarEnded;

export type ChatMessage = {
  username: string;
  message: string;
  role: string;
  timeshift_ms: number;
};

export type ChatMessagesResponse = {
  all_scripted_messages: ChatMessage[];
};
