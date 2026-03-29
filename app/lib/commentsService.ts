import api from './api';

export const getCommentsByPost = async (postId: number) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data;
};
