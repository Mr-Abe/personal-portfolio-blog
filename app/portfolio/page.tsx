import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Portfolio
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A showcase of my projects and technical skills
          </p>
        </div>

        {/* Skills Section */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {/* Placeholder for skills - To be replaced with actual data */}
            {['Frontend Development', 'Backend Development', 'DevOps'].map((skill) => (
              <div key={skill} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  {skill}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Description of skills and technologies used in {skill.toLowerCase()}.
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Placeholder for projects - To be replaced with actual data from Supabase */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="flex flex-col items-start">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime="2024-01" className="text-gray-500">
                    January 2024
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                    Project Category
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                    <Link href={`/portfolio/project-${i}`}>
                      <span className="absolute inset-0" />
                      Project {i}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    A brief description of this project, highlighting the problem solved and technologies used.
                  </p>
                </div>
                <div className="mt-4 flex gap-x-2">
                  <Link
                    href="#"
                    className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 