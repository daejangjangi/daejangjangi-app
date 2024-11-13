import {Pagination} from './pagination.type';

export type Board = '자유';

export interface Comment {
  id: number;
  content: string;
  nickname: string;
  profile: string;
  likes: number;
  createdAt: string;
  commentInfos: Comment[];
  deleted: boolean;
  liked: boolean;
  author: boolean;
}

export interface PostDetail {
  id: number;
  title: string;
  content: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  boards: Board[];
  isAuthor: boolean;
  views: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  isPopular: boolean;
  commentInfo: Comment[];
}

interface PostListItem {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  isPopular: boolean;
}

export type PostList = {
  content: PostListItem[];
} & Pagination;

export interface PostCreate {
  title: string;
  content: string;
  boards: Board[];
}

export interface CommentCreate {
  postId: number;
  parentCommentId: number;
  content: string;
}
