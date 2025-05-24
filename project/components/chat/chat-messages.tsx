'use client';

import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <ScrollArea className="flex-1 p-4 overflow-auto">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id}
            message={message}
            isUserMessage={message.user?.id === '2'} // Assuming the current user has id '2'
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </ScrollArea>
  );
}

interface ChatMessageProps {
  message: Message;
  isUserMessage: boolean;
}

export function ChatMessage({ message, isUserMessage }: ChatMessageProps) {
  const formatMessageTime = (date: string) => {
    return format(new Date(date), 'HH:mm');
  };

  return (
    <div 
      className={cn(
        "flex gap-2 max-w-[80%]",
        isUserMessage ? "ml-auto" : "mr-auto"
      )}
    >
      {!isUserMessage && (
        <Avatar className="h-8 w-8 mt-0.5">
          <AvatarImage src={message.user?.avatar_url} />
          <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
            {message.user?.full_name?.[0]?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={cn(
          "rounded-lg p-3 text-sm",
          isUserMessage 
            ? "bg-green-100 text-green-900" 
            : "bg-gray-100 text-gray-900"
        )}
      >
        {!isUserMessage && (
          <p className="font-medium text-xs mb-1">{message.user?.full_name}</p>
        )}
        <p>{message.content}</p>
        <div 
          className={cn(
            "text-xs mt-1",
            isUserMessage ? "text-green-700 text-right" : "text-gray-500"
          )}
        >
          {formatMessageTime(message.created_at)}
        </div>
      </div>
    </div>
  );
}