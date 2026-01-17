'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '@/src/data/announcements';
import { Calendar } from 'lucide-react';

interface AnnouncementListProps {
  announcements: Announcement[];
  limit?: number;
}

export function AnnouncementList({ announcements, limit }: AnnouncementListProps) {
  const displayAnnouncements = limit ? announcements.slice(0, limit) : announcements;

  return (
    <div className="space-y-3">
      {displayAnnouncements.map((announcement) => (
        <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
          <Card className="p-4 transition-all hover:shadow-md hover:border-primary/50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={announcement.tag === '重要' ? 'destructive' : 'secondary'}>
                    {announcement.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {announcement.date}
                  </span>
                </div>
                <h3 className="font-medium line-clamp-2">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {announcement.content}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
