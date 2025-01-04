'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/app/lib/types';
import Image from 'next/image';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {projects.map((project) => (
        <Link key={project.id} href={`/portfolio/${project.slug}`} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                width={500}
                height={300}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-300">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-200">{project.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{project.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList; 