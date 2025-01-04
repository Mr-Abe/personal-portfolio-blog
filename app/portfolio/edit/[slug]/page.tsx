import { getProject, updateProject } from '@/app/actions/projects';
import ProjectEditor from '@/app/components/projects/ProjectEditor';
import { notFound, redirect } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { slug: string } }) {
  const result = await getProject(params.slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const handleSave = async (project: any) => {
    const updateResult = await updateProject(result.data.id, project);
    if (updateResult.success) {
      redirect(`/portfolio/${updateResult.data.slug}`);
    } else {
      // Handle error (e.g., display an error message)
      console.error(updateResult.error);
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectEditor initialProject={result.data} onSave={handleSave} />
      </div>
    </div>
  );
} 