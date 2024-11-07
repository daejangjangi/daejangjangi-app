import httpInstance from './http';
import {CartoonChapterDetail, Cartoon, CartoonChapter} from './types/cartoon.type';

const DAEJANGTOON_ID = 1;

// 대장툰 조회
async function getCartoons() {
  const response = await httpInstance.get<Cartoon[]>(`/v1/daejangtoons/${DAEJANGTOON_ID}`);

  return response;
}

// 대장툰 특정회차 조회
async function getCartoonChapterDetail(chapter: number) {
  const response = await httpInstance.get<CartoonChapterDetail>(
    `/v1/daejangtoons/${DAEJANGTOON_ID}/${chapter}`,
  );

  return response;
}

// 최신 대장툰 조회
async function getCartoonLatestChapter() {
  const response = await httpInstance.get<CartoonChapter>(
    `/v1/daejangtoons/${DAEJANGTOON_ID}/recent`,
  );

  return response;
}

// 대장툰 좋아요
async function likeCartoon(chapter: number) {
  const response = await httpInstance.post(`/v1/daejangtoons/${DAEJANGTOON_ID}/${chapter}/likes`);

  return response;
}

export const CartoonApi = {
  getCartoons,
  getCartoonChapterDetail,
  getCartoonLatestChapter,
  likeCartoon,
};
