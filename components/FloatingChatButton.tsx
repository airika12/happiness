'use client';

import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DifyChatEmbed } from '@/components/DifyChatEmbed';

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg md:hidden z-50"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] h-[80vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>AIアシスタント</DialogTitle>
            <DialogDescription>
              社内の手続きやシステムについて質問できます
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-4 pt-2">
            <DifyChatEmbed className="h-full shadow-none border-0" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
