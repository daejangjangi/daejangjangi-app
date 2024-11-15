import httpInstance from './http';
import {PostApi} from './post.api';
import {Board, PostList} from './types/post.type';

// 관심 게시판 조회
async function getPinnedBoards() {
  const response = await httpInstance.get<{
    pinnedBoards: Board[];
  }>('/v1/boards/pinned-boards');

  return response.data;
}

// 게시판별로 게시글 조회
async function getPostsByBoard(board: Board | '인기', page: number, size: number) {
  try {
    if (board === '인기') {
      const response = await PostApi.getHotPosts(page, size);
      return response;
    }

    const response = await httpInstance.get<PostList>(
      `/v1/boards?board=${board}&page=${page}&size=${size}`,
    );

    return response.data;
  } catch (err) {
    console.error('getPostsByBoard error', err);
    return {
      posts: [],
      pageNumber: page,
      pageSize: size,
      totalElements: 0,
      totalPages: 0,
    };
  }
}

// 관심 게시판 수정
async function updatePinnedBoards(boards: Board[]) {
  const response = await httpInstance.put<{pinnedBoards: Board[]}, null>(
    '/v1/boards/pinned-boards',
    {pinnedBoards: boards},
  );

  return response.data;
}

export const BoardApi = {
  getPinnedBoards,
  getPostsByBoard,
  updatePinnedBoards,
};
