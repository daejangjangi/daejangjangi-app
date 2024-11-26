import httpInstance from './http';

// FCM 토큰 저장
async function postFcmToken(token: string) {
  const response = await httpInstance.post<{fcmToken: string}, null>('/v1/fcms', {
    fcmToken: token,
  });

  return response.data;
}

// FCM 토큰 삭제
async function deleteFcmToken(token: string) {
  const response = await httpInstance.delete<null>(`/v1/fcms`, null, {
    data: {
      fcmToken: token,
    },
  });

  return response.data;
}

export const FcmApi = {
  postFcmToken,
  deleteFcmToken,
};
