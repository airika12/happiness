import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { announcements } from '@/src/data/announcements';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export function generateStaticParams() {
  return announcements.map((announcement) => ({
    id: announcement.id,
  }));
}

export default function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const announcement = announcements.find((a) => a.id === params.id);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/announcements">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            お知らせ一覧に戻る
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={announcement.tag === '重要' ? 'destructive' : 'secondary'}>
                {announcement.tag}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {announcement.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                投稿者: {announcement.author}
              </span>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {announcement.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
