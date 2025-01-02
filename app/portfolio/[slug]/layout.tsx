import { Metadata } from 'next';
import { getProject } from '@/app/actions/projects';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const result = await getProject(params.slug);

  if (!result.success || !result.data) {
    return {
      title: 'Project Not Found | From Medicine to Code',
      description: 'The requested project could not be found.',
    };
  }

  const project = result.data;

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Portfolio`,
      description: project.description,
      type: 'article',
      images: project.image_url ? [{ url: project.image_url }] : undefined,
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
} 