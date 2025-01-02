import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/app/actions/projects';
import ReactMarkdown from 'react-markdown';
import ProjectPlaceholder from '@/app/components/projects/ProjectPlaceholder';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const result = await getProject(params.slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <article>
            <div className="relative">
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

            <div className="mt-8">
              <div className="flex items-center gap-x-4 text-xs">
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
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-x-4">
              {project.demo_url && (
                <Link
                  href={project.demo_url}
                  target="_blank"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Live Demo
                </Link>
              )}
              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
                >
                  View on GitHub
                </Link>
              )}
            </div>

            {project.content && (
              <div className="mt-16 prose dark:prose-invert max-w-none">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            )}

            <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
              <Link
                href="/portfolio"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                ← Back to portfolio
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 