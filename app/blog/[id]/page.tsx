import { getPostById } from '../../lib/postsService';
import CommentSection from '../../components/blog/CommentSection/page';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogDetail({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <div className="p-10">Invalid Post</div>;
  }

  const post = await getPostById(numericId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* Body */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-muted-foreground text-lg">{post.body}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm border rounded-md bg-muted"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-4">
          <span>👁 {post.views}</span>
          <span>👍 {post.reactions?.likes}</span>
        </div>
        <CommentSection postId={numericId} />
      </div>
    </div>
  );
}
