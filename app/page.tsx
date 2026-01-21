'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LinkGrid } from '@/components/LinkGrid';
import { AnnouncementList } from '@/components/AnnouncementList';
import { ManualList } from '@/components/ManualList';

import { announcements } from '@/src/data/announcements';
import { manuals, manualCategories } from '@/src/data/manuals';
import { systemLinks } from '@/src/data/systems';
import { requestTypes } from '@/src/data/requests';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  BookOpen,
  Grid3x3,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function HomePage() {
  const popularManuals = manuals.filter(m => m.popular);
  const recentAnnouncements = announcements.slice(0, 5);

  const portalRequestTypes = requestTypes.filter(r =>
    ['expense-support', 'attendance-correction', 'leave-request', 'it-support'].includes(r.type)
  );

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

          <Card id="systems-section">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Grid3x3 className="h-5 w-5 text-primary" />
                <CardTitle>社内システム</CardTitle>
              </div>
              <CardDescription>
                よく使うシステム／申請へ素早くアクセス
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="systems" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="systems">システム</TabsTrigger>
                  <TabsTrigger value="requests">申請</TabsTrigger>
                </TabsList>

                <TabsContent value="systems" className="mt-0">
                  <LinkGrid links={systemLinks} />
                </TabsContent>

                <TabsContent value="requests" className="mt-0">
                  <div className="grid gap-2">
                    {portalRequestTypes.map((request) => (
                      <Link key={request.id} href={`/requests/${request.type}`}>
                        <Button variant="outline" className="w-full justify-start" size="sm">
                          <FileText className="mr-2 h-4 w-4 text-primary" />
                          {request.name}
                        </Button>
                      </Link>
                    ))}
                    <div className="pt-2">
                      <Link href="/requests">
                        <Button variant="ghost" size="sm">
                          申請一覧を開く
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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

        </div>
      </div>
    </div>
  );
}
