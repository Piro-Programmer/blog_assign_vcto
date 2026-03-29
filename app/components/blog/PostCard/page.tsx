import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number;
  views: number;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      {/* Title */}
      <h2 className="text-lg font-bold mb-2">{post.title}</h2>

      {/* Body */}
      <p className="text-gray-600 text-sm mb-3">{post.body.slice(0, 80)}...</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>👁 {post.views}</span>
        <span>👍 {post.reactions?.likes}</span>
      </div>

      {/* Button */}
      <Link href={`/blog/${post.id}`}>
        <button className="text-blue-500 text-sm font-medium">
          Read More →
        </button>
      </Link>
    </div>
  );
}
