'use client';

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { ReactNode } from 'react';
import '../utils/client/prismSetup';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">
        <div className="min-h-screen flex flex-col items-center">
          <Header />
          <main className="flex-1 w-full max-w-4xl px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}