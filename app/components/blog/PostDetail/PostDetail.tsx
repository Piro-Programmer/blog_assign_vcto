'use client';

type Post = {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: {
    likes?: number;
    dislikes?: number;
  };
  views?: number;
};

export default function PostDetail({ post }: { post: Post }) {
  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {/* Body */}
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{post.body}</p>

      {/* Tags */}
      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm border rounded-md bg-gray-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-6 text-sm text-gray-500 border-t pt-4">
        {post.views && <span>👁 {post.views}</span>}
        {post.reactions?.likes && <span>👍 {post.reactions.likes}</span>}
        {post.reactions?.dislikes && <span>👎 {post.reactions.dislikes}</span>}
      </div>
    </article>
  );
}
