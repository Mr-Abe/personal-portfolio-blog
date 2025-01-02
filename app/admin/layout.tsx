import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <nav className="flex space-x-4">
            <Link href="/admin/blog">Manage Blog</Link>
            <Link href="/admin/portfolio">Manage Portfolio</Link>
            <Link href="/admin/comments">Monitor Comments</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
    </div>
  );
} 