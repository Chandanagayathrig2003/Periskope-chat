import { FiMessageSquare } from 'react-icons/fi';

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <FiMessageSquare className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold mb-2">Welcome to Periskope Chat</h1>
      <p className="text-muted-foreground max-w-sm">
        Select a conversation from the sidebar to start chatting or create a new conversation.
      </p>
    </div>
  );
}