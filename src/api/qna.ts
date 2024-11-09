import httpInstance from './http';
import {Answer, Question} from './types/qna.type';

// 회원 QnA 목록
async function getQnaList() {
  const response = await httpInstance.get<Answer[]>('/v1/qnas');

  return response.data;
}

// QnA 등록
async function createQna(question: Question) {
  const response = await httpInstance.post<Question, null>('/v1/qnas', question);

  return response.data;
}

export const QnaApi = {
  getQnaList,
  createQna,
};
