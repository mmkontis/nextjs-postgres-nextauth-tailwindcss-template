import DashboardLayout from '../(dashboard)/layout'
import { GeminiChat } from '@/components/GeminiChatHome'

export default function PersonPage({ params }: { params: { person: string } }) {
  return (
    <DashboardLayout>
      <GeminiChat 
        person={{ name: params.person.replace('-', ' '), role: '' }}
        isChatMode={true}
        setIsChatMode={() => {}}
        selectedConversation={null}
      />
    </DashboardLayout>
  )
}