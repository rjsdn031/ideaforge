'use client';

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { ReactNode } from 'react';
import { useState } from 'react';
import '../utils/client/prismSetup';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/logo_b.svg"  media="(prefers-color-scheme: light)"/>
        <link rel="icon" href="/logo_w.svg"  media="(prefers-color-scheme: dark)"/>
      </head>
      <body className="bg-white text-gray-900">
        <div className="min-h-screen flex flex-col items-center">
          <Header onHeightChange={setHeaderHeight} />
          <main
            className="flex-1 w-full max-w-4xl px-0 sm:px-4 md:px-8 py-8"
            style={{ paddingTop: `${headerHeight}px` }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}