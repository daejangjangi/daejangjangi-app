import httpInstance from './http';
import {CommentCreate, PostCreate, PostDetail, PostList} from './types/post.type';

// 게시글 삭제
async function deletePost(postId: number) {
  const response = await httpInstance.delete<null>(`/v1/posts/${postId}`);

  return response.data;
}

// 댓글 삭제
async function deleteComment(commentId: number) {
  const response = await httpInstance.delete<null>(`/v1/posts/comments/${commentId}`);

  return response.data;
}

// 게시글 상세 조회
async function getPostDetail(postId: number) {
  const response = await httpInstance.get<PostDetail>(`/v1/posts/${postId}`);

  return response.data;
}

// 게시글 검색
async function searchPost(page: number, size: number, keyword: string) {
  const response = await httpInstance.get<PostList>(
    `/v1/posts/search?page=${page}&size=${size}&keyword=${keyword}`,
  );

  return response.data;
}

// 내가 쓴 게시글 조회
async function getMyPosts(page: number, size: number) {
  const response = await httpInstance.get<PostList>(`/v1/posts/my-posts?page=${page}&size=${size}`);

  return response.data;
}

// 인기 게시글 조회
async function getHotPosts(page: number, size: number) {
  const response = await httpInstance.get<PostList>(`/v1/posts/hot?page=${page}&size=${size}`);

  return response.data;
}

// 댓글 단 게시글 조회
async function getCommentedPosts(page: number, size: number) {
  const response = await httpInstance.get<PostList>(
    `/v1/posts/commented-posts?page=${page}&size=${size}`,
  );

  return response.data;
}

// 게시글 생성
async function createPost(data: PostCreate) {
  const response = await httpInstance.post<PostCreate, null>('/v1/posts', data);

  return response.data;
}

// 댓글 생성
async function createComment(data: CommentCreate) {
  const response = await httpInstance.post<CommentCreate, null>('/v1/posts/comments', data);

  return response.data;
}

// 게시글 좋아요
async function likePost(postId: number) {
  const response = await httpInstance.post<null, null>(`/v1/posts/${postId}/likes`);

  return response.data;
}

// 게시글 댓글 좋아요
async function likeComment(commentId: number) {
  const response = await httpInstance.post<null, null>(`/v1/posts/comments/${commentId}/likes`);

  return response.data;
}

// 게시글 수정
async function updatePost(postId: number, data: PostCreate) {
  const response = await httpInstance.put<{id: number} & PostCreate, null>(`/v1/posts`, {
    id: postId,
    ...data,
  });

  return response.data;
}

// 댓글 수정
async function updateComment(commentId: number, content: string) {
  const response = await httpInstance.put<{id: number; content: string}, null>(
    `/v1/posts/comments`,
    {
      id: commentId,
      content,
    },
  );

  return response.data;
}

export const PostApi = {
  deletePost,
  deleteComment,
  getPostDetail,
  searchPost,
  getMyPosts,
  getHotPosts,
  getCommentedPosts,
  createPost,
  createComment,
  likePost,
  likeComment,
  updatePost,
  updateComment,
};
