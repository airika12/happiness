'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Manual } from '@/src/data/manuals';
import { Eye, Clock } from 'lucide-react';

interface ManualListProps {
  manuals: Manual[];
  limit?: number;
}

export function ManualList({ manuals, limit }: ManualListProps) {
  const displayManuals = limit ? manuals.slice(0, limit) : manuals;

  return (
    <div className="space-y-3">
      {displayManuals.map((manual) => (
        <Link key={manual.id} href={`/manuals/${manual.slug}`}>
          <Card className="p-4 transition-all hover:shadow-md hover:border-primary/50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {manual.popular && (
                    <Badge variant="default">人気</Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {manual.updatedAt}
                  </span>
                </div>
                <h3 className="font-medium line-clamp-1">{manual.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {manual.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{manual.views.toLocaleString()} 回閲覧</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
