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

// export default async function BlogDetail({ params }: Props) {
//   const { id } = await params;

//   const numericId = Number(id);

//   if (isNaN(numericId)) {
//     return <div className="p-10">Invalid Post ID</div>;
//   }

//   const post = await getPostById(numericId);

//   return (
//     <main className="p-10 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

//       <p className="text-gray-600 mb-6">{post.body}</p>

//       <div className="flex gap-4 text-sm">
//         <span>👁 {post.views}</span>
//         <span>👍 {post.reactions?.likes}</span>
//       </div>
//     </main>
//   );
// }

// type Props = {
//   params: {
//     id: string;
//   };
// };

// export default async function BlogDetail({ params }: Props) {
//   const id = Number(params.id);

//   if (isNaN(id)) {
//     return <div className="p-10">Invalid Post ID</div>;
//   }

//   const post = await getPostById(id);

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

//       <p className="text-gray-600 mb-4">{post.body}</p>

//       <div className="flex gap-4 text-sm">
//         <span>👁 {post.views}</span>
//         <span>👍 {post.reactions?.likes}</span>
//       </div>
//     </div>
//   );
// }
