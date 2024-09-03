import { Person } from '@/components/GeminiChatHome';

export const routerUtils = {
  getPersonFromPathname(pathname: string, avras: Person[]): Person | null {
    const personName = pathname.slice(1).replace('-', ' ');
    return avras.find(p => p.name.toLowerCase() === personName.toLowerCase()) || null;
  },

  getUrlForPerson(person: Person): string {
    return `/${encodeURIComponent(person.name.toLowerCase().replace(' ', '-'))}`;
  },

  getUrlForConversation(person: Person, conversationTitle: string): string {
    return `${this.getUrlForPerson(person)}/${encodeURIComponent(conversationTitle.toLowerCase().replace(' ', '-'))}`;
  }
};