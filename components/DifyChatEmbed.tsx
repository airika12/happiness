'use client';

import { Card } from '@/components/ui/card';

interface DifyChatEmbedProps {
  className?: string;
}

export function DifyChatEmbed({ className = '' }: DifyChatEmbedProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <h2 className="text-lg font-semibold">AIアシスタント</h2>
        <p className="text-sm text-muted-foreground">
          社内の質問にお答えします
        </p>
      </div>
      <div className="relative" style={{ height: '500px' }}>
        <iframe
          src="https://udify.app/chatbot/PLACEHOLDER_CHATBOT_ID"
          className="h-full w-full border-0"
          allow="microphone"
          title="Dify Chatbot"
        />
      </div>
    </Card>
  );
}
