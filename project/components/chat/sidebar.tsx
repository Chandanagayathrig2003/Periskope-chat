'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatListItem } from '@/components/chat/chat-list-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chat } from '@/types';
import { FiHome, FiMessageSquare, FiActivity, FiUsers, FiClipboard, FiSettings, FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for chats
const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Test Skope Final 5',
    subtitle: 'SupaxTD: This doesn\'t go on Tuesday...',
    labels: ['Demo'],
    last_message_time: 'Yesterday',
    participants: [{ id: '1', full_name: 'SupaxTD', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'Periskope Team Chat',
    subtitle: 'Periskope: Test message',
    labels: ['Demo', 'Internal'],
    last_message_time: '28-Feb-24',
    participants: [{ id: '2', full_name: 'Periskope', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: '+91 99999 99999',
    subtitle: 'Hi there, I\'m Deeprika, Co-Founder of...',
    labels: ['Demo', 'Urgent'],
    last_message_time: '22-02-24',
    participants: [{ id: '3', full_name: 'Deeprika', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    name: 'Test Demo17',
    subtitle: 'Rohesen: 123',
    labels: ['Demo', 'Contact'],
    last_message_time: '20-Feb-24',
    participants: [{ id: '4', full_name: 'Rohesen', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '5',
    name: 'Test El Centro',
    subtitle: 'Roadmap: Hello, Annadport!',
    labels: ['Demo'],
    last_message_time: '04-Feb-24',
    participants: [{ id: '5', full_name: 'Roadmap', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '6',
    name: 'Testing group',
    subtitle: 'Testing 12345',
    labels: ['Demo'],
    last_message_time: '27-Jan-24',
    participants: [{ id: '6', full_name: 'Testing', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '7',
    name: 'Yasin 3',
    subtitle: 'First Bulk Message',
    labels: ['Demo', 'Draft Sent'],
    last_message_time: '20-Nov-24',
    participants: [{ id: '7', full_name: 'Yasin', avatar_url: '', created_at: '' }],
    created_at: '',
    updated_at: '',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [filter, setFilter] = useState('');
  const [customFilter, setCustomFilter] = useState('');
  const [showCustomFilter, setShowCustomFilter] = useState(false);

  const filteredChats = mockChats.filter(chat => {
    if (!filter) return true;
    return chat.name.toLowerCase().includes(filter.toLowerCase()) ||
      chat.subtitle?.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <aside className="w-80 border-r flex flex-col h-full bg-white dark:bg-gray-950">
      <header className="p-3 border-b flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <FiHome className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-sm text-gray-600 dark:text-gray-300">chats</h1>
        <div className="flex-1"></div>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <FiSearch className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <FiMessageSquare className="h-5 w-5" />
        </Button>
      </header>
      
      {showCustomFilter ? (
        <div className="px-3 py-2 border-b flex items-center gap-2">
          <Button size="sm" variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs rounded-sm h-6 flex-shrink-0">
            Custom filter
          </Button>
          <Button size="sm" variant="ghost" className="ml-auto h-6 px-2">Save</Button>
        </div>
      ) : (
        <div className="px-3 py-2 border-b flex items-center gap-2">
          <Button
            onClick={() => setShowCustomFilter(true)}
            size="sm"
            variant="outline"
            className="text-xs rounded-sm h-6 flex items-center gap-1 flex-shrink-0"
          >
            <FiFilter className="h-3 w-3" />
            Custom filter
          </Button>
          <Input 
            className="h-7 text-sm"
            placeholder="Search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <FiFilter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <nav className="flex flex-col">
          {filteredChats.map((chat) => (
            <ChatListItem 
              key={chat.id}
              chat={chat}
              isActive={pathname === `/chats/${chat.id}`}
            />
          ))}
        </nav>
      </ScrollArea>
      
      <div className="border-t p-0 bg-white dark:bg-gray-950">
        <nav className="flex flex-col">
          <NavButton icon={<FiHome />} />
          <NavButton icon={<FiMessageSquare />} isActive />
          <NavButton icon={<FiActivity />} />
          <NavButton icon={<FiUsers />} />
          <NavButton icon={<FiClipboard />} />
          <NavButton icon={<FiSettings />} />
        </nav>
      </div>
    </aside>
  );
}

function NavButton({ 
  icon, 
  isActive 
}: { 
  icon: React.ReactNode, 
  isActive?: boolean 
}) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn(
        "h-12 w-full rounded-none border-b",
        isActive && "bg-secondary"
      )}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
    </Button>
  );
}