import httpInstance from './http';
import {CartoonDetail, CartoonList, CartoonListItem} from './types/cartoon.type';

const DAEJANGTOON_ID = 1;

// 대장툰 조회
async function getCartoonList() {
  const response = await httpInstance.get<CartoonList>(`/v1/daejangtoons/${DAEJANGTOON_ID}`);

  return response;
}

// 대장툰 특정회차 조회
async function getCartoonDetail(chapter: number) {
  const response = await httpInstance.get<CartoonDetail>(
    `/v1/daejangtoons/${DAEJANGTOON_ID}/${chapter}`,
  );

  return response;
}

// 최신 대장툰 조회
async function getCartoonLatest() {
  const response = await httpInstance.get<CartoonListItem>(
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
  getCartoonList,
  getCartoonDetail,
  getCartoonLatest,
  likeCartoon,
};
