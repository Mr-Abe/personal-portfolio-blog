import { getProjects } from '../actions/projects';
import ProjectList from '../components/projects/ProjectList';

export default async function PortfolioPage() {
  const result = await getProjects();

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            My Portfolio
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Check out some of my recent projects.
          </p>
        </div>
        {result.success ? (
          <ProjectList projects={result.data || []} />
        ) : (
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {result.error || 'Failed to load projects'}
          </p>
        )}
      </div>
    </div>
  );
} 