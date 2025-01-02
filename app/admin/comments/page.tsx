import React from 'react';
import { getComments, deleteComment } from '@/app/actions/comments';
import ProtectedAdminRoute from '@/app/components/ProtectedAdminRoute';
import { Comment } from '@/app/lib/types';

export default function AdminCommentsPage() {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchComments = async () => {
      const result = await getComments();
      if (result.success) {
        setComments(result.data || []);
      }
      setLoading(false);
    };
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await deleteComment(id);
    if (result.success) {
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedAdminRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Monitor Comments</h1>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{comment.message}</span>
                <div>
                  <button onClick={() => handleDelete(comment.id)} className="bg-red-600 text-white px-2 py-1 rounded">
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