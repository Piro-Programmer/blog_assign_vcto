'use client';

import { useEffect, useState } from 'react';
import { getCommentsByPost } from '../../../lib/commentsService';

type Comment = {
  id: number;
  body: string;
  likes: number;
  user: {
    username: string;
  };
};

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getCommentsByPost(postId);
      setComments(data.comments);
    };

    fetchComments();
  }, [postId]);

  // ✅ Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const newObj: Comment = {
      id: Date.now(),
      body: newComment,
      likes: 0,
      user: {
        username: 'You'
      }
    };

    setComments([newObj, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg font-semibold">
          💬 Comments ({comments.length})
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border rounded-md p-3 mb-2"
          placeholder="Write a comment..."
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-3 p-4 bg-gray-100 rounded-lg"
          >
            {/* Avatar */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
              👤
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1">
                {comment.user.username}
              </div>

              <p className="text-sm">{comment.body}</p>

              <div className="text-xs text-gray-500 mt-2">
                👍 {comment.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
