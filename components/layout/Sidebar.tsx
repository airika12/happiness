'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, BookOpen, Grid3x3, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const menuItems = [
  {
    href: '/',
    label: 'HOME',
    icon: Home,
  },
  {
    href: '/announcements',
    label: 'お知らせ',
    icon: Bell,
  },
  {
    href: '/manuals',
    label: 'マニュアル',
    icon: BookOpen,
  },
  {
    href: '#',
    label: '社内システム',
    icon: Grid3x3,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      document.getElementById('systems-section')?.scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    href: '/requests',
    label: '社内申請',
    icon: FileText,
  },
];

interface SidebarProps {
  onItemClick?: () => void;
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background hidden lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && item.href !== '#';
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  item.onClick(e);
                }
                onItemClick?.();
              }}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function SidebarContent({ onItemClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4">
      {menuItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && item.href !== '#';
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => {
              if (item.onClick) {
                item.onClick(e);
              }
              onItemClick?.();
            }}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
