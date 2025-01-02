import React from 'react';
import { getProjects } from '../actions/projects';
import ProjectList from '../components/projects/ProjectList';

const skills = [
  {
    title: 'Frontend Development',
    description:
      'Expertise in modern frontend technologies including React, Next.js, TypeScript, and Tailwind CSS. Building responsive and accessible web applications with a focus on user experience.',
  },
  {
    title: 'Backend Development',
    description:
      'Experience with Node.js, PostgreSQL, and serverless technologies. Proficient in building RESTful APIs and working with database systems.',
  },
  {
    title: 'DevOps & Tools',
    description:
      'Familiar with Git, CI/CD pipelines, and cloud platforms. Experience with Docker, testing frameworks, and monitoring tools.',
  },
];

export default async function PortfolioPage() {
  const result = await getProjects();

  if (!result.success) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Error
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {result.error || 'Failed to load projects'}
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            {skills.map((skill) => (
              <div key={skill.title} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  {skill.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{skill.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-16">
          <ProjectList projects={result.data || []} />
        </div>
      </div>
    </div>
  );
} 