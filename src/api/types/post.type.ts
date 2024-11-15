import {Pagination} from './pagination.type';

export enum Board {
  자유 = '자유',
  변비 = '변비',
  과민성장증후군_설사형 = '과민성장증후군_설사형',
  과민성장증후군_변비형 = '과민성장증후군_변비형',
  치질 = '치질',
  치핵 = '치핵',
  치열 = '치열',
  변실금 = '변실금',
  항문소양증 = '항문소양증',
  대장암 = '대장암',
  크론병 = '크론병',
  궤양성대장염 = '궤양성대장염',
  복부팽만 = '복부팽만',
  기타 = '기타',
}

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
  posts: PostListItem[];
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
