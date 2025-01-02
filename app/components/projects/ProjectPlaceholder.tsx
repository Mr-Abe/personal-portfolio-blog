import React from 'react';

interface ProjectPlaceholderProps {
  title: string;
  category: string;
}

export default function ProjectPlaceholder({ title, category }: ProjectPlaceholderProps) {
  return (
    <div className="aspect-[16/9] w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center p-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-indigo-100">{category}</p>
      </div>
    </div>
  );
} 