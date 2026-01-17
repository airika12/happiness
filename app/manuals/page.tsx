'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { manuals, manualCategories } from '@/src/data/manuals';
import { Search, BookOpen, Eye, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ManualsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredManuals = useMemo(() => {
    return manuals.filter((manual) => {
      const matchesCategory = selectedCategory === 'all' || manual.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        manual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manual.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">マニュアル</h1>
        <p className="text-muted-foreground">
          社内の手続きやシステムの使い方を確認できます
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">カテゴリ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {manualCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="マニュアルを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          {filteredManuals.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">マニュアルが見つかりません</h3>
                <p className="text-muted-foreground">
                  別のカテゴリを選択するか、検索条件を変更してください
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredManuals.map((manual) => (
                <Link key={manual.id} href={`/manuals/${manual.slug}`}>
                  <Card className="transition-all hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {manual.popular && (
                              <Badge variant="default">人気</Badge>
                            )}
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              更新日: {manual.updatedAt}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{manual.title}</h3>
                          <p className="text-muted-foreground mb-3">
                            {manual.description}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span>{manual.views.toLocaleString()} 回閲覧</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
