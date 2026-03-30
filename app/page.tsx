'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { BookOpen, Zap, Shield } from 'lucide-react';

import { fetchPostsRequest } from './store/slices/postsSlice';
import { RootState } from './store/index';

import PostCard from './components/blog/PostCard/page';

export default function HomePage() {
  const dispatch = useDispatch();

  const {
    posts = [],
    loading,
    error
  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return (
    <main>
      {/* 🔥 HERO SECTION */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Stories that <span className="text-blue-600">inspire</span>,
            <br />
            ideas that <span className="text-blue-600">matter</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
            A modern blog platform powered by Redux-Saga, with offline caching,
            dark mode, and a beautiful reading experience.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:opacity-90"
            >
              Start Reading →
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium hover:bg-gray-100"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-lg border p-6 text-center hover:border-blue-400 transition">
            <BookOpen className="mx-auto mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold">Rich Content</h3>
            <p className="text-sm text-gray-600">
              Explore in-depth articles on technology, science, and culture.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border p-6 text-center hover:border-blue-400 transition">
            <Zap className="mx-auto mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Built with modern tools for instant page loads and smooth
              navigation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg border p-6 text-center hover:border-blue-400 transition">
            <Shield className="mx-auto mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold">Secure Auth</h3>
            <p className="text-sm text-gray-600">
              JWT-based authentication with automatic token management.
            </p>
          </div>
        </div>
      </section>
      {/* 🔥 POSTS SECTION */}
      <section className="p-10">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
