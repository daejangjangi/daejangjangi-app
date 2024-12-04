import httpInstance from './http';
import {CreateStoolLogDTO, GetStoolLogsDTO, UpdateStoolLogDTO} from './types/care.type';

// 배변 일지 등록
async function createStoolLog(dto: CreateStoolLogDTO) {
  const response = await httpInstance.post<CreateStoolLogDTO, null>('/v1/stoollogs', dto);

  return response.data;
}

// 배변 일지 수정
async function updateStoolLog(dto: UpdateStoolLogDTO) {
  const response = await httpInstance.put<UpdateStoolLogDTO, null>('/v1/stoollogs', dto);

  return response.data;
}

// 배변 일지 조회
async function getStoolLogs(date: string) {
  const response = await httpInstance.get<GetStoolLogsDTO>(`/v1/stoollogs?date=${date}`);

  return response.data;
}

// 배변 일지 삭제
async function deleteStoolLog(stoolLogId: number) {
  const response = await httpInstance.delete<null>(`/v1/stoollogs/${stoolLogId}`);

  return response.data;
}

export const CareApi = {
  createStoolLog,
  updateStoolLog,
  getStoolLogs,
  deleteStoolLog,
};
