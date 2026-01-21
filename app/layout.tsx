import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

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
        <Sidebar />

        <main className="min-h-screen bg-background lg:ml-64">
          {children}
        </main>

        <Script id="dify-chatbot-config" strategy="beforeInteractive">
          {`
            window.difyChatbotConfig = {
              token: 'p544zOXofCthE0TT',
              inputs: {},
              systemVariables: {},
              userVariables: {}
            };
          `}
        </Script>

        <Script
          src="https://udify.app/embed.min.js"
          id="p544zOXofCthE0TT"
          strategy="afterInteractive"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              #dify-chatbot-bubble-button {
                background-color: #dc143c !important;
              }
              #dify-chatbot-bubble-button:hover {
                filter: brightness(1.05);
              }
              #dify-chatbot-bubble-window {
                width: min(24rem, 92vw) !important;
                height: min(40rem, 78vh) !important;
              }
            `,
          }}
        />

        <Toaster />
      </body>
    </html>
  );
}
