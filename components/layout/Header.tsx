'use client';

import Link from 'next/link';
import { Building2, User } from 'lucide-react';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="hidden text-lg sm:inline-block">社内ポータル</span>
          </Link>

          <div className="flex-1 max-w-2xl hidden md:block">
            <SearchBar />
          </div>

          <button className="flex items-center gap-2 rounded-full p-2 hover:bg-secondary">
            <User className="h-5 w-5" />
          </button>
        </div>

        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
