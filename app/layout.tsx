import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { FloatingChatButton } from '@/components/FloatingChatButton';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '社内ポータル',
  description: '社内情報・システムへのアクセスポータル',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <FloatingChatButton />
        <Toaster />
      </body>
    </html>
  );
}
