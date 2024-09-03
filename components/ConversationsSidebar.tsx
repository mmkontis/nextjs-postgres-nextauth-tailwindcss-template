import React from 'react';
import { useRouter } from 'next/navigation';
import { Person } from '@/components/GeminiChatHome';

interface ConversationsSidebarProps {
  person: Person;
  onConversationClick: (conversationTitle: string) => void;
  selectedConversation: string | null;
}

export function ConversationsSidebar({ person, onConversationClick }: ConversationsSidebarProps) {
  const router = useRouter();
  const conversations = [
    { id: 1, title: 'Project Discussion' },
    { id: 2, title: 'Weekly Update' },
    { id: 3, title: 'Client Meeting' },
    // Add more conversations as needed
  ];

  const handleConversationClick = (conversationTitle: string) => {
    onConversationClick(conversationTitle);
  };

  return (
    <aside className="h-full flex-col border-r bg-muted/60 flex">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Conversations with {person.name}</h2>
        <div className="flex flex-col gap-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => handleConversationClick(conversation.title)}
              className="px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
            >
              {conversation.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}