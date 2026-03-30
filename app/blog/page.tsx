import Link from 'next/link';
import { getAllPosts } from '../lib/postsService';

export default async function Blog() {
  const posts = await getAllPosts(10, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground line-clamp-2">{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
