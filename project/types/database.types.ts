export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
          last_message: string | null
          last_message_at: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
          last_message?: string | null
          last_message_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
          last_message?: string | null
          last_message_at?: string | null
        }
        Relationships: []
      }
      chat_labels: {
        Row: {
          id: string
          chat_id: string
          label_id: string
        }
        Insert: {
          id?: string
          chat_id: string
          label_id: string
        }
        Update: {
          id?: string
          chat_id?: string
          label_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_labels_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_labels_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "labels"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_members: {
        Row: {
          id: string
          chat_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          user_id?: string
          joined_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      labels: {
        Row: {
          id: string
          name: string
          color: string
        }
        Insert: {
          id?: string
          name: string
          color: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          user_id: string
          content: string
          created_at: string
          is_read: boolean
        }
        Insert: {
          id?: string
          chat_id: string
          user_id: string
          content: string
          created_at?: string
          is_read?: boolean
        }
        Update: {
          id?: string
          chat_id?: string
          user_id?: string
          content?: string
          created_at?: string
          is_read?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          avatar_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      attachments: {
        Row: {
          id: string
          message_id: string
          type: string
          url: string
          name: string
          size: number
          created_at: string
        }
        Insert: {
          id?: string
          message_id: string
          type: string
          url: string
          name: string
          size?: number
          created_at?: string
        }
        Update: {
          id?: string
          message_id?: string
          type?: string
          url?: string
          name?: string
          size?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}