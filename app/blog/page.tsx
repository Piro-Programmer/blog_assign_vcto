'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostsRequest } from '../store/slices/postsSlice';
import { RootState } from '../store/index';

import PostCard from '../components/blog/PostCard/page';

export default function BlogPage() {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  // fetch posts on load
  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return (
    <main className="p-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">All Blog Posts 📚</h1>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading posts...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <p className="text-gray-500 mt-6">No posts found.</p>
      )}
    </main>
  );
}
