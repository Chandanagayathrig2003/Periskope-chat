'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { FiPaperclip, FiSmile, FiImage, FiCalendar, FiMic, FiSend } from 'react-icons/fi';

interface ChatInputProps {
  chatId: string;
}

export function ChatInput({ chatId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // In a real app, this would use Supabase to insert the message
    // const { error } = await supabase
    //   .from('messages')
    //   .insert({
    //     chat_id: chatId,
    //     user_id: 'current-user-id',
    //     content: message,
    //     is_read: false,
    //   });

    // For demo purposes, we'll fake sending a message by using mock data
    // that's rendered on the page
    const mockMessage = {
      id: Date.now().toString(),
      chat_id: chatId,
      user_id: '2',
      user: { id: '2', full_name: 'You', avatar_url: '', created_at: '' },
      content: message,
      is_read: true,
      created_at: new Date().toISOString(),
    };

    // Get current messages from DOM and add new message
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'flex gap-2 max-w-[80%] ml-auto mt-4';
      messageDiv.innerHTML = `
        <div class="rounded-lg p-3 text-sm bg-green-100 text-green-900">
          <p>${message}</p>
          <div class="text-xs mt-1 text-green-700 text-right">
            ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      `;
      messagesContainer.appendChild(messageDiv);
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-3 border-t bg-white dark:bg-gray-950">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <div className="absolute bottom-0 left-0 p-2 flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FiPaperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FiSmile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FiImage className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FiCalendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FiMic className="h-5 w-5" />
            </Button>
          </div>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="min-h-24 resize-none px-2 py-3 pl-[170px]"
          />
        </div>
        <Button 
          onClick={sendMessage}
          disabled={!message.trim() || isUploading}
          size="icon" 
          className="h-10 w-10 rounded-full bg-green-500 hover:bg-green-600"
        >
          <FiSend className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}