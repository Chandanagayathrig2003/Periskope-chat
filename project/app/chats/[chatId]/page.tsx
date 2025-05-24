'use client';

import { useEffect, useState } from 'react';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Chat, Message, User } from '@/types';

export default function ChatPage() {
  const { chatId } = useParams();
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // Fetch chat details
        const { data: chatData, error: chatError } = await supabase
          .from('chats')
          .select('*, users:profiles(*)')
          .eq('id', chatId)
          .single();

        if (chatError) throw chatError;
        
        // Fetch chat messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*, user:profiles(*)')
          .eq('chat_id', chatId)
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;

        setChat(chatData);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChatData();
      
      // Subscribe to new messages
      const subscription = supabase
        .channel(`messages:${chatId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        }, (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        })
        .subscribe();
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [chatId]);

  // Mock data for development
  const mockChat = {
    id: chatId as string,
    name: 'Test El Centro',
    subtitle: 'Roadmap, Arrtez, Rohimag Jid, Bharat Kumar Rawnak, Periskope',
    labels: ['Demo'],
    participants: [
      { id: '1', name: 'Roadmap Aintai', avatar_url: '' },
      { id: '2', name: 'You', avatar_url: '' },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const mockMessages = [
    {
      id: '1',
      content: 'Hello, South Euna!',
      created_at: '2023-01-22T14:30:00',
      user: { id: '1', full_name: 'Roadmap Aintai', avatar_url: '' },
    },
    {
      id: '2',
      content: 'Hello, Livonia!',
      created_at: '2023-01-22T14:45:00',
      user: { id: '2', full_name: 'You', avatar_url: '' },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader chat={chat || mockChat} />
      <ChatMessages messages={messages.length > 0 ? messages : mockMessages} />
      <ChatInput chatId={chatId as string} />
    </div>
  );
}