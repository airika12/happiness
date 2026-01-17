import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { manuals, manualCategories } from '@/src/data/manuals';
import { ArrowLeft, Clock, Eye } from 'lucide-react';

export function generateStaticParams() {
  return manuals.map((manual) => ({
    slug: manual.slug,
  }));
}

export default function ManualDetailPage({ params }: { params: { slug: string } }) {
  const manual = manuals.find((m) => m.slug === params.slug);

  if (!manual) {
    notFound();
  }

  const category = manualCategories.find((c) => c.id === manual.category);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/manuals">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            マニュアル一覧に戻る
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              {manual.popular && (
                <Badge variant="default">人気</Badge>
              )}
              {category && (
                <Badge variant="outline">{category.name}</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{manual.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {manual.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                更新日: {manual.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {manual.views.toLocaleString()} 回閲覧
              </span>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="prose prose-slate max-w-none">
              <ManualMarkdown content={manual.content} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ManualMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-6">{line.substring(2)}</li>;
        }
        if (line.startsWith('**Q: ')) {
          const text = line.substring(4, line.length - 2);
          return <p key={index} className="font-semibold mt-4">{text}</p>;
        }
        if (line.startsWith('A: ')) {
          return <p key={index} className="ml-4 text-muted-foreground">{line.substring(3)}</p>;
        }
        if (line.trim() === '') {
          return <div key={index} className="h-2" />;
        }
        return <p key={index} className="leading-7">{line}</p>;
      })}
    </div>
  );
}
