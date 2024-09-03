import { GeminiChat } from '@/components/GeminiChatHome'
import { Person } from '@/components/GeminiChatHome';

export default function ConversationPage({ params }: { params: { person: string, conversation: string } }) {
  const person: Person = { name: params.person.replace('-', ' '), role: '' };
  
  return (
    <GeminiChat 
      person={person}
      isChatMode={true}
      setIsChatMode={() => {}}
      selectedConversation={params.conversation.replace('-', ' ')}
    />
  )
}