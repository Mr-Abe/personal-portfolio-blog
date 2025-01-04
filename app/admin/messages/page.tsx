'use client';

import { getContactMessages, deleteContactMessage, markMessageAsRead } from '@/app/actions/messages';
import { useEffect, useState } from 'react';
import { ContactMessage } from '@/app/lib/types';

const ITEMS_PER_PAGE = 10;

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getContactMessages({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      sortBy,
      sortOrder,
      search,
    });
    if (result.success) {
      setMessages(result.data);
      setTotalPages(Math.ceil(result.count / ITEMS_PER_PAGE));
      setError(null);
    } else {
      setError(result.error || '');
      setMessages([]);
      setTotalPages(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, sortBy, sortOrder, search]);

  const handleDelete = async (id: string) => {
    const deleteResult = await deleteContactMessage(id);
    if (deleteResult.success) {
      fetchData(); // Re-fetch data after successful deletion
    } else {
      setError(deleteResult.error || '');
    }
  };

  const handleMarkAsRead = async (id: string, read: boolean) => {
    const markResult = await markMessageAsRead(id, read);
    if (markResult.success) {
      fetchData(); // Re-fetch data after marking as read/unread
    } else {
      setError(markResult.error || '');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Contact Messages
        </h1>

        <div className="mt-6 flex items-center gap-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
          />
          <button
            onClick={() => fetchData()}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : messages.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      className="cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                      onClick={() => handleSort('name')}
                    >
                      Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      onClick={() => handleSort('subject')}
                    >
                      Subject {sortBy === 'subject' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      onClick={() => handleSort('created_at')}
                    >
                      Date {sortBy === 'created_at' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Read
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {messages.map((message) => (
                    <tr key={message.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                        {message.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{message.email}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{message.subject}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(message.created_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <input
                          type="checkbox"
                          checked={message.read}
                          onChange={() => handleMarkAsRead(message.id, !message.read)}
                        />
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
} 