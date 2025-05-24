import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

interface UserGroupProps {
  users: User[];
}

export function UserGroup({ users }: UserGroupProps) {
  const MAX_VISIBLE = 4;
  const visibleUsers = users.slice(0, MAX_VISIBLE);
  const extraCount = users.length - MAX_VISIBLE;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, i) => (
        <Avatar key={i} className="h-6 w-6 border-2 border-background">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="bg-gray-200 text-gray-700 text-[10px]">
            {getInitials(user.full_name || 'User')}
          </AvatarFallback>
        </Avatar>
      ))}
      
      {extraCount > 0 && (
        <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center">
          <span className="text-[10px] text-gray-700">+{extraCount}</span>
        </div>
      )}
    </div>
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