'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/app/lib/types';
import { useRouter } from 'next/navigation';

interface ProjectEditorProps {
  initialProject?: Partial<Project>;
  onSave: (project: Project) => Promise<void>;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ initialProject, onSave }) => {
  const [project, setProject] = useState<Project>({
    id: initialProject?.id || '',
    title: initialProject?.title || '',
    slug: initialProject?.slug || '',
    description: initialProject?.description || '',
    content: initialProject?.content || '',
    image_url: initialProject?.image_url || '',
    github_url: initialProject?.github_url || '',
    demo_url: initialProject?.demo_url || '',
    technologies: initialProject?.technologies || [],
    featured: initialProject?.featured || false,
    category: initialProject?.category || '',
    created_at: initialProject?.created_at || '',
    updated_at: initialProject?.updated_at || '',
    published: initialProject?.published || false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (initialProject) {
      setProject(initialProject as Project);
    }
  }, [initialProject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProject((prev) => ({ ...prev, technologies: value.split(',').map((tech) => tech.trim()) }));
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProject((prev) => ({ ...prev, content: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProject((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await onSave(project);
      router.push('/admin/projects');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while saving the project.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {project ? 'Edit Project' : 'Create Project'}
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={project.title || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Slug
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  value={project.slug || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={project.description || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Content
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="content"
                  name="content"
                  rows={5}
                  value={project.content || ''}
                  onChange={handleMarkdownChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="image_url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Image URL
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="image_url"
                  id="image_url"
                  value={project.image_url || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="github_url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                GitHub URL
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="github_url"
                  id="github_url"
                  value={project.github_url || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="demo_url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Demo URL
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="demo_url"
                  id="demo_url"
                  value={project.demo_url || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="technologies"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Technologies (comma-separated)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="technologies"
                  id="technologies"
                  value={project.technologies.join(', ') || ''}
                  onChange={handleTechnologiesChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="featured"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Featured
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={project.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2"
              >
                Category
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={project.category || ''}
                  onChange={handleInputChange}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectEditor; 