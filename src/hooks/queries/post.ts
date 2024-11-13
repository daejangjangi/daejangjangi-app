import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {PostApi} from '@/src/api/post';
import type {CommentCreate, PostCreate} from '@/src/api/types/post.type';

export const postKeys = {
  all: ['post'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
  myPosts: () => [...postKeys.all, 'my-posts'] as const,
  hotPosts: () => [...postKeys.all, 'hot'] as const,
  commentedPosts: () => [...postKeys.all, 'commented-posts'] as const,
  search: (keyword: string) => [...postKeys.all, 'search', keyword] as const,
};

// 게시글 상세 조회
export function usePostDetail(postId: number) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => PostApi.getPostDetail(postId),
  });
}

// 게시글 검색
export function useSearchPosts(page: number, size: number, keyword: string) {
  return useQuery({
    queryKey: postKeys.search(keyword),
    queryFn: () => PostApi.searchPost(page, size, keyword),
    enabled: keyword.length > 0,
  });
}

// 내가 쓴 게시글 조회
export function useMyPosts(page: number, size: number) {
  return useQuery({
    queryKey: postKeys.myPosts(),
    queryFn: () => PostApi.getMyPosts(page, size),
  });
}

// 인기 게시글 조회
export function useHotPosts(page: number, size: number) {
  return useQuery({
    queryKey: postKeys.hotPosts(),
    queryFn: () => PostApi.getHotPosts(page, size),
  });
}

// 댓글 단 게시글 조회
export function useCommentedPosts(page: number, size: number) {
  return useQuery({
    queryKey: postKeys.commentedPosts(),
    queryFn: () => PostApi.getCommentedPosts(page, size),
  });
}

// 게시글 생성
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostCreate) => PostApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: postKeys.lists()});
      queryClient.invalidateQueries({queryKey: postKeys.myPosts()});
    },
  });
}

// 댓글 생성
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentCreate) => PostApi.createComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: postKeys.detail(variables.postId)});
    },
  });
}

// 게시글 좋아요
export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => PostApi.likePost(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({queryKey: postKeys.detail(postId)});
      queryClient.invalidateQueries({queryKey: postKeys.lists()});
      queryClient.invalidateQueries({queryKey: postKeys.hotPosts()});
    },
  });
}

// 댓글 좋아요
export function useLikeComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => PostApi.likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: postKeys.all});
    },
  });
}

// 게시글 수정
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({postId, data}: {postId: number; data: PostCreate}) =>
      PostApi.updatePost(postId, data),
    onSuccess: (_, {postId}) => {
      queryClient.invalidateQueries({queryKey: postKeys.detail(postId)});
      queryClient.invalidateQueries({queryKey: postKeys.lists()});
    },
  });
}

// 댓글 수정
export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({commentId, content}: {commentId: number; content: string}) =>
      PostApi.updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: postKeys.all});
    },
  });
}

// 게시글 삭제
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => PostApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: postKeys.lists()});
      queryClient.invalidateQueries({queryKey: postKeys.myPosts()});
    },
  });
}

// 댓글 삭제
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => PostApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: postKeys.all});
    },
  });
}
