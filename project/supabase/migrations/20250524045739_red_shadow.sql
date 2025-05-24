/*
  # Initial Schema for Periskope Chat

  1. New Tables
    - `profiles`: User profiles linked to Supabase auth
    - `chats`: Chat conversations
    - `messages`: Individual messages within chats
    - `chat_members`: Many-to-many relationship between chats and users
    - `labels`: Chat label definitions
    - `chat_labels`: Many-to-many relationship between chats and labels
    - `attachments`: Files attached to messages
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_message TEXT,
  last_message_at TIMESTAMPTZ
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);

-- Create chat_members table for chat participants
CREATE TABLE IF NOT EXISTS chat_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (chat_id, user_id)
);

-- Create labels table
CREATE TABLE IF NOT EXISTS labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL
);

-- Create chat_labels table for linking chats and labels
CREATE TABLE IF NOT EXISTS chat_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
  UNIQUE (chat_id, label_id)
);

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'file')),
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  size INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Chats - users can view chats they are members of
CREATE POLICY "Users can view their chats"
  ON chats
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_id = chats.id AND user_id = auth.uid()
    )
  );

-- Messages - users can view messages in chats they are members of
CREATE POLICY "Users can view messages in their chats"
  ON messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_id = messages.chat_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in their chats"
  ON messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_id = messages.chat_id AND user_id = auth.uid()
    )
  );

-- Chat members - users can view members of chats they belong to
CREATE POLICY "Users can view members of their chats"
  ON chat_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_members as cm
      WHERE cm.chat_id = chat_members.chat_id AND cm.user_id = auth.uid()
    )
  );

-- Labels - all authenticated users can view labels
CREATE POLICY "Authenticated users can view labels"
  ON labels
  FOR SELECT
  TO authenticated
  USING (true);

-- Chat labels - users can view labels for chats they belong to
CREATE POLICY "Users can view labels for their chats"
  ON chat_labels
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_id = chat_labels.chat_id AND user_id = auth.uid()
    )
  );

-- Attachments - users can view attachments for messages in their chats
CREATE POLICY "Users can view attachments in their chats"
  ON attachments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM messages
      JOIN chat_members ON messages.chat_id = chat_members.chat_id
      WHERE messages.id = attachments.message_id
      AND chat_members.user_id = auth.uid()
    )
  );

-- Insert default labels
INSERT INTO labels (name, color) VALUES 
  ('Demo', '#F97316'),
  ('Internal', '#10B981'),
  ('Urgent', '#06B6D4'),
  ('Contact', '#8B5CF6'),
  ('Draft Sent', '#EF4444');