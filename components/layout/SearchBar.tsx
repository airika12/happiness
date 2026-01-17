'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { manuals } from '@/src/data/manuals';
import { announcements } from '@/src/data/announcements';
import { systemLinks } from '@/src/data/systems';

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (type: string, id: string) => {
    setOpen(false);
    if (type === 'manual') {
      router.push(`/manuals/${id}`);
    } else if (type === 'announcement') {
      router.push(`/announcements/${id}`);
    } else if (type === 'system') {
      const system = systemLinks.find(s => s.id === id);
      if (system) {
        window.open(system.url, '_blank');
      }
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative w-full cursor-pointer"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="検索... (Ctrl+K)"
          className="w-full pl-9 pr-4"
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="マニュアル、お知らせ、システムを検索..." />
        <CommandList>
          <CommandEmpty>結果が見つかりませんでした</CommandEmpty>

          <CommandGroup heading="マニュアル">
            {manuals.slice(0, 5).map((manual) => (
              <CommandItem
                key={manual.id}
                onSelect={() => handleSelect('manual', manual.slug)}
              >
                {manual.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="お知らせ">
            {announcements.slice(0, 5).map((announcement) => (
              <CommandItem
                key={announcement.id}
                onSelect={() => handleSelect('announcement', announcement.id)}
              >
                {announcement.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="システム">
            {systemLinks.slice(0, 5).map((system) => (
              <CommandItem
                key={system.id}
                onSelect={() => handleSelect('system', system.id)}
              >
                {system.nameJa}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
