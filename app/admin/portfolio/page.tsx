import React from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '@/app/actions/projects';
import ProtectedAdminRoute from '@/app/components/ProtectedAdminRoute';
import { Project } from '@/app/lib/types';

export default function AdminPortfolioPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjects();
      if (result.success) {
        setProjects(result.data || []);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    // Logic to create a new project
  };

  const handleUpdate = async (id: string) => {
    // Logic to update a project
  };

  const handleDelete = async (id: string) => {
    // Logic to delete a project
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedAdminRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>
        <button onClick={handleCreate} className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Create New Project
        </button>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{project.title}</span>
                <div>
                  <button onClick={() => handleUpdate(project.id)} className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedAdminRoute>
  );
} 