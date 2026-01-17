'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DifyChatEmbed } from '@/components/DifyChatEmbed';
import { LinkGrid } from '@/components/LinkGrid';
import { AnnouncementList } from '@/components/AnnouncementList';
import { ManualList } from '@/components/ManualList';
import { announcements } from '@/src/data/announcements';
import { manuals, manualCategories } from '@/src/data/manuals';
import { systemLinks } from '@/src/data/systems';
import { requestTypes } from '@/src/data/requests';
import {
  MessageSquare,
  Bell,
  BookOpen,
  Grid3x3,
  FileText,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const popularManuals = manuals.filter(m => m.popular);
  const recentAnnouncements = announcements.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ようこそ</h1>
        <p className="text-muted-foreground">
          社内情報とシステムへの統合アクセスポータル
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>AIアシスタントに質問</CardTitle>
              </div>
              <CardDescription>
                社内の手続きやシステムについて質問できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DifyChatEmbed className="shadow-none border-0" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>お知らせ</CardTitle>
                </div>
                <Link href="/announcements">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>
                最新の社内情報をチェック
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnnouncementList announcements={recentAnnouncements} limit={5} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>人気のマニュアル</CardTitle>
                </div>
                <Link href="/manuals">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>
                よく閲覧されているマニュアル
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ManualList manuals={popularManuals} limit={4} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Grid3x3 className="h-5 w-5 text-primary" />
                <CardTitle>社内システム</CardTitle>
              </div>
              <CardDescription>
                よく使うシステムへ素早くアクセス
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LinkGrid links={systemLinks} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>マニュアルカテゴリ</CardTitle>
              </div>
              <CardDescription>
                カテゴリから探す
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {manualCategories.filter(c => c.id !== 'all').map((category) => (
                  <Link key={category.id} href={`/manuals?category=${category.id}`}>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>各種申請</CardTitle>
                </div>
                <Link href="/requests">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>
                よく使う申請フォーム
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requestTypes.slice(0, 4).map((request) => (
                  <Link key={request.id} href={`/requests/${request.type}`}>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      {request.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
