import httpInstance from './http';
import {Reels} from './types/reels.type';

// 릴스 목록 조회
async function getReelsList() {
  const response = await httpInstance.get<{
    reelsInfoList: Reels[];
  }>('/v1/reels');

  return response.data;
}

// 릴스 상세 조회
async function getReelsDetail(id: number) {
  const response = await httpInstance.get<Reels>(`/v1/reels/${id}`);

  return response.data;
}

export const ReelsApi = {
  getReelsList,
  getReelsDetail,
};
