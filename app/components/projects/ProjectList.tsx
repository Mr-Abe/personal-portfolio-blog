'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/app/lib/types';
import ProjectPlaceholder from './ProjectPlaceholder';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-3">
      {projects.map((project) => (
        <article key={project.id} className="flex flex-col items-start">
          <div className="relative w-full">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                width={800}
                height={450}
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover dark:bg-gray-800"
              />
            ) : (
              <ProjectPlaceholder title={project.title} category={project.category || 'Project'} />
            )}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
          </div>
          <div className="max-w-xl">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <time dateTime={project.created_at} className="text-gray-500">
                {new Date(project.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
              {project.category && (
                <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                  {project.category}
                </span>
              )}
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                <Link href={`/portfolio/${project.slug}`}>
                  <span className="absolute inset-0" />
                  {project.title}
                </Link>
              </h3>
              <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-x-2">
              {project.demo_url && (
                <Link
                  href={project.demo_url}
                  target="_blank"
                  className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Live Demo
                </Link>
              )}
              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  GitHub
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 