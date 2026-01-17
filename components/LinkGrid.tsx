'use client';

import { Card } from '@/components/ui/card';
import {
  Clock,
  Receipt,
  MessageSquare,
  HardDrive,
  Mail,
  Calendar,
  TrendingUp,
  Video,
  Users,
  GraduationCap,
  Headphones,
  Building2,
  ExternalLink
} from 'lucide-react';
import { SystemLink } from '@/src/data/systems';

const iconMap: Record<string, any> = {
  Clock,
  Receipt,
  MessageSquare,
  HardDrive,
  Mail,
  Calendar,
  TrendingUp,
  Video,
  Users,
  GraduationCap,
  Headphones,
  Building2,
};

interface LinkGridProps {
  links: SystemLink[];
}

export function LinkGrid({ links }: LinkGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {links.map((link) => {
        const Icon = iconMap[link.icon] || ExternalLink;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="p-4 transition-all hover:shadow-md hover:border-primary/50">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{link.nameJa}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {link.description}
                  </div>
                </div>
              </div>
            </Card>
          </a>
        );
      })}
    </div>
  );
}
