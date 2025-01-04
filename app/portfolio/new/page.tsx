import { createProject } from '@/app/actions/projects';
import ProjectEditor from '@/app/components/projects/ProjectEditor';
import { redirect } from 'next/navigation';

export default async function NewProjectPage() {
  const handleSave = async (project: any) => {
    const result = await createProject(project);
    if (result.success) {
      redirect(`/portfolio/${result.data.slug}`);
    } else {
      // Handle error (e.g., display an error message)
      console.error(result.error);
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectEditor onSave={handleSave} />
      </div>
    </div>
  );
} 