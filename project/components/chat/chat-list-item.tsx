'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Chat } from '@/types';

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
}

export function ChatListItem({ chat, isActive }: ChatListItemProps) {
  return (
    <Link 
      href={`/chats/${chat.id}`} 
      className={cn(
        "flex items-start gap-3 p-3 border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900",
        isActive && "bg-gray-50 dark:bg-gray-900"
      )}
    >
      <Avatar className="h-8 w-8 rounded-full flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
          {getInitials(chat.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-sm truncate">{chat.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {chat.last_message_time}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground truncate mt-1">
          {chat.subtitle}
        </p>
        
        <div className="flex items-center mt-1 gap-1">
          {chat.labels?.map((label, i) => {
            const color = getLabelColor(label);
            return (
              <Badge 
                key={i}
                variant="outline"
                className={cn(
                  "text-[10px] py-0 h-4 rounded-sm font-normal border",
                  color
                )}
              >
                {label}
              </Badge>
            );
          })}
          {chat.unread_count && (
            <Badge className="bg-emerald-500 text-white ml-auto text-[10px] py-0 h-4 min-w-4">
              {chat.unread_count}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

function getLabelColor(label: string): string {
  switch (label) {
    case 'Demo':
      return 'border-orange-200 text-orange-700 bg-orange-50';
    case 'Internal':
      return 'border-green-200 text-green-700 bg-green-50';
    case 'Urgent':
      return 'border-cyan-200 text-cyan-700 bg-cyan-50';
    case 'Contact':
      return 'border-violet-200 text-violet-700 bg-violet-50';
    case 'Draft Sent':
      return 'border-red-200 text-red-700 bg-red-50';
    default:
      return 'border-gray-200 text-gray-700 bg-gray-50';
  }
}