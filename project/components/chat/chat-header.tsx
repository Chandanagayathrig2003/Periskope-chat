'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Chat } from '@/types';
import { FiPhoneCall, FiVideo, FiRefreshCw, FiHelpCircle, FiMoreHorizontal } from 'react-icons/fi';
import { UserGroup } from './user-group';

interface ChatHeaderProps {
  chat: Chat;
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <header className="p-3 border-b flex items-center bg-white dark:bg-gray-950">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-base">{chat.name}</h1>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs rounded-sm bg-muted">
            CVFER
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs rounded-sm bg-muted">
            CDERT
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{chat.subtitle}</p>
      </div>
      
      <div className="flex items-center gap-1">
        <UserGroup users={chat.participants} />
        
        <Separator orientation="vertical" className="h-6 mx-2" />
        
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <FiPhoneCall className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <FiVideo className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <FiRefreshCw className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <FiHelpCircle className="h-5 w-5" />
        </Button>
        
        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
        
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <FiMoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}