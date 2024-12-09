import httpInstance from './http';
import {
  AnalyzeStoolImageResponse,
  CreateStoolLogDTO,
  DiagnosisStoolImageRequest,
  DiagnosisStoolImageResponse,
  GetStoolLogsDTO,
  RegisterStoolDiagnosisRequest,
  RegisterStoolDiagnosisResponse,
  UpdateStoolLogDTO,
} from './types/care.type';

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

// 배변 이미지 분석
async function analyzeStoolImage(formData: FormData) {
  const response = await httpInstance.post<FormData, AnalyzeStoolImageResponse>(
    '/v1/stoolanalyses/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}

// 배변 진단
async function diagnosisStoolImage(dto: DiagnosisStoolImageRequest) {
  const response = await httpInstance.post<DiagnosisStoolImageRequest, DiagnosisStoolImageResponse>(
    '/v1/stoolanalyses/diagnosis',
    dto,
  );

  return response.data;
}

// 배변 분석 결과 일지에 등록
async function registerStoolDiagnosisResult(dto: RegisterStoolDiagnosisRequest) {
  const response = await httpInstance.post<
    RegisterStoolDiagnosisRequest,
    RegisterStoolDiagnosisResponse
  >('/v1/stoolanalyses', dto);

  return response.data;
}

export const CareApi = {
  createStoolLog,
  updateStoolLog,
  getStoolLogs,
  deleteStoolLog,
  analyzeStoolImage,
  diagnosisStoolImage,
  registerStoolDiagnosisResult,
};
