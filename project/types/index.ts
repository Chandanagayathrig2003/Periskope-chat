export interface User {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export type LabelType = 'Demo' | 'Internal' | 'Urgent' | 'Contact' | 'Draft Sent';

export interface Chat {
  id: string;
  name: string;
  subtitle?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count?: number;
  labels?: LabelType[];
  participants: User[];
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  user_id: string;
  user?: User;
  content: string;
  is_read: boolean;
  created_at: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  message_id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name: string;
  size?: number;
  created_at: string;
}

export interface ChatLabel {
  id: string;
  name: string;
  color: string;
}