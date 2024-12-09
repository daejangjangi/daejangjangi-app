import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CareApi} from '@/src/api/care.api';
import type {
  CreateStoolLogDTO,
  DiagnosisStoolImageRequest,
  UpdateStoolLogDTO,
  RegisterStoolDiagnosisRequest,
} from '@/src/api/types/care.type';

export const careKeys = {
  all: ['care'] as const,
  stoolLogs: () => [...careKeys.all, 'stoolLogs'] as const,
  stoolLogsByDate: (date: string) => [...careKeys.stoolLogs(), date] as const,
};

// 배변 일지 목록 조회
export function useStoolLogs(date: string) {
  return useQuery({
    queryKey: careKeys.stoolLogsByDate(date),
    queryFn: () => CareApi.getStoolLogs(date),
  });
}

// 배변 일지 생성
export function useCreateStoolLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateStoolLogDTO) => CareApi.createStoolLog(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careKeys.all,
      });
    },
  });
}

// 배변 일지 수정
export function useUpdateStoolLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateStoolLogDTO) => CareApi.updateStoolLog(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careKeys.all,
      });
    },
  });
}

// 배변 일지 삭제
export function useDeleteStoolLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stoolLogId: number) => CareApi.deleteStoolLog(stoolLogId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careKeys.stoolLogs(),
      });
    },
  });
}

// 배변 이미지 분석
export function useStoolImageAnalysis() {
  return useMutation({
    mutationFn: (image: string) => {
      const formData = new FormData();
      formData.append('stoolImage', {
        uri: image,
        type: 'image/png',
        name: 'stool-image.png',
      } as unknown as File);

      return CareApi.analyzeStoolImage(formData);
    },
  });
}

// 배변 진단
export function useStoolDiagnosis() {
  return useMutation({
    mutationFn: (dto: DiagnosisStoolImageRequest) => CareApi.diagnosisStoolImage(dto),
  });
}

// 배변 분석 결과 저장
export function useRegisterStoolDiagnosis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RegisterStoolDiagnosisRequest) => CareApi.registerStoolDiagnosisResult(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careKeys.all,
      });
    },
  });
}
