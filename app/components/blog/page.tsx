'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostsRequest } from '../../store/slices/postsSlice';
import { RootState } from '../../store/index';

import PostCard from '../blog/PostCard/page';

export default function BlogPage() {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Blogs 📚</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
