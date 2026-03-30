import api from './api';

// ✅ Types (important)
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

// ✅ Get All Posts (with pagination support)
export const getAllPosts = async (
  limit: number = 10,
  skip: number = 0
): Promise<Post[]> => {
  const response = await api.get<PostsResponse>(
    `/posts?limit=${limit}&skip=${skip}`
  );

  return response.data.posts;
};

// ✅ Get Single Post
export const getPostById = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

// ✅ Search Posts (bonus feature 🔥)
export const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await api.get<PostsResponse>(`/posts/search?q=${query}`);

  return response.data;
};
