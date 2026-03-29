'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPostsRequest,
  addPost,
  deletePost,
  updatePost
} from '../store/slices/postsSlice';

import { RootState } from '../store';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { posts, loading } = useSelector((state: RootState) => state.posts);

  // ✅ USER INIT (no warning)
  const [user] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');

    if (!isAuth) {
      router.replace('/login');
      return;
    }

    dispatch(fetchPostsRequest());
  }, [dispatch, router]);

  // 🔥 FORM STATE
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = () => {
    if (!title || !body) return;

    if (editingId !== null) {
      dispatch(
        updatePost({
          id: editingId,
          title,
          body
        })
      );
    } else {
      dispatch(
        addPost({
          title,
          body
        })
      );
    }

    // reset form
    setTitle('');
    setBody('');
    setEditingId(null);
  };

  // ✏️ EDIT
  const handleEdit = (post: any) => {
    setTitle(post.title);
    setBody(post.body);
    setEditingId(post.id);
  };

  // 🗑️ DELETE
  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <main className="px-4 py-12">
      <section className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your posts efficiently</p>
        </div>

        {/* 🔥 FORM */}
        <div className="border rounded-lg p-6 mb-8 bg-card">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? '✏️ Edit Post' : '➕ Add New Post'}
          </h2>

          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded-md"
          />

          <textarea
            placeholder="Enter post content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded-md"
            rows={4}
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {editingId ? 'Update Post' : 'Add Post'}
            </button>

            {editingId !== null && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setBody('');
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* POSTS LIST */}
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="border rounded-lg p-5 flex justify-between items-start bg-card"
              >
                <div>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.body.slice(0, 120)}...
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
