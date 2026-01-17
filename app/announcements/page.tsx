'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { announcements, announcementTags } from '@/src/data/announcements';
import { Bell, Calendar } from 'lucide-react';

export default function AnnouncementsPage() {
  const [selectedTag, setSelectedTag] = useState('すべて');

  const filteredAnnouncements = useMemo(() => {
    if (selectedTag === 'すべて') {
      return announcements;
    }
    return announcements.filter((announcement) => announcement.tag === selectedTag);
  }, [selectedTag]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">お知らせ</h1>
        <p className="text-muted-foreground">
          社内の最新情報をチェックできます
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">タグで絞り込み</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {announcementTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">お知らせがありません</h3>
                <p className="text-muted-foreground">
                  別のタグを選択してください
                </p>
              </div>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Bell className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={announcement.tag === '重要' ? 'destructive' : 'secondary'}>
                            {announcement.tag}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {announcement.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {announcement.content}
                        </p>
                        <div className="mt-3 text-sm text-muted-foreground">
                          投稿者: {announcement.author}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
