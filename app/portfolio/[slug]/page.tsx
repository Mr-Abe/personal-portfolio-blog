import { getProject } from '@/app/actions/projects';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const result = await getProject(params.slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
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
                <div className="h-12 w-full rounded-2xl bg-gray-100 dark:bg-gray-800" />
              )}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
            </div>

            <div className="mt-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>

            <div className="mt-16 prose dark:prose-invert max-w-none">
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </div>

            {project.github_url && (
              <div className="mt-8">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  View on GitHub
                </a>
              </div>
            )}

            {project.demo_url && (
              <div className="mt-4">
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Live Demo
                </a>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technologies</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <li key={tech}>
                      <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
} 