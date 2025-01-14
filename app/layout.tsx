import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import { AuthProvider } from './lib/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Portfolio & Blog',
  description: 'A software engineer\'s journey from medicine to code',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 h-full`}
        suppressHydrationWarning={true}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const isDarkMode = localStorage.getItem('darkMode') === 'true';
              if (isDarkMode) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
        <AuthProvider>
          <div className="min-h-full">
            <Navigation />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
