import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';

export default function Home() {
  // In a real application, we would check for authentication
  // and redirect if already logged in
  // const session = await getSession();
  // if (session) redirect('/chats');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary/20">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </main>
  );
}