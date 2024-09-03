import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export interface Person {
  name: string;
  role: string;
}

export function GeminiChat({ person }: { person: Person }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with {person.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will go here */}
        <div className="space-y-4">
          <div className="bg-muted p-2 rounded-lg">
            <p className="text-sm">Hello! How can I assist you today?</p>
          </div>
          {/* Add more message bubbles as needed */}
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Input placeholder="Type your message..." />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}