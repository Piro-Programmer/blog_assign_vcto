import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ✅ Types
export interface Post {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: number;
  views?: number;
  userId?: number;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// ✅ Initial State
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null
};

// ✅ Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 🔄 FETCH
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },

    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ➕ ADD POST
    addPost: (
      state,
      action: PayloadAction<{ title: string; body: string }>
    ) => {
      const newPost: Post = {
        id: Date.now(),
        title: action.payload.title,
        body: action.payload.body,
        tags: [],
        reactions: 0,
        views: 0,
        userId: 1
      };

      state.posts.unshift(newPost);
    },

    // 🗑️ DELETE POST
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    // ✏️ UPDATE POST
    updatePost: (
      state,
      action: PayloadAction<{ id: number; title: string; body: string }>
    ) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          title: action.payload.title,
          body: action.payload.body
        };
      }
    }
  }
});

// ✅ exports
export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  deletePost,
  updatePost
} = postsSlice.actions;

export default postsSlice.reducer;
