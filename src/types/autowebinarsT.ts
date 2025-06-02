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

export type CreateWebinar = {
  title: string;
  description?: string;
  youtube_url?: string;
  video?: File;
  is_active: true;
  start_time: string;
  weekdays: number[];
  has_chat: boolean;
  chat_script?: Record<string, any>;
  duration_minutes?: number;
};

export type CreateAutowebinarPayload = {
  schoolName: string;
  formData: FormData;
};

export type Autowebinar = {
  id: number;
  title: string;
  description: string;
  youtube_url: string | null;
  video: string | null;
  youtube_video_id: string;
  video_type: string;
  effective_video_url: string;
  school: number;
  is_active: boolean;
  start_time: string | null;
  weekdays: number[];
  slug: string;
  has_chat: boolean;
  chat_script: Record<string, unknown> | null;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
};
