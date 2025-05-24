'use client';

import { Sidebar } from '@/components/chat/sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate auth check - in real app this would check Supabase session
  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (!user) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}