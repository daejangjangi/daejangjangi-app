/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {useAuthStore} from '@/src/stores/auth';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from 'axios';
import {useRouter} from 'expo-router';

const axiosInstance = axios.create({
  baseURL: 'https://daejangjangi.site/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(async config => {
  const {tokens} = useAuthStore.getState();
  const accessToken = tokens?.accessToken;

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 토큰 만료로 인한 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {tokens} = useAuthStore.getState();

        // refreshToken으로 새로운 토큰 발급 요청
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/v1/tokens/reissue`, {
          refreshToken: tokens?.refreshToken,
        });

        const newTokens = response.data;
        useAuthStore.getState().setTokens(newTokens);

        // 새로운 accessToken으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refreshToken도 만료된 경우
        useAuthStore.getState().clearTokens();
        const router = useRouter();
        router.replace('/auth/signin');

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

interface APIResponse<RequestBodyDTO, ResponseBodyDTO> {
  data: ResponseBodyDTO;
  status: number;
  code: string;
  message: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<RequestBodyDTO>;
  request?: any;
}

function convertToResponse<RequestBodyDTO, ResponseBodyDTO>(
  response: AxiosResponse,
): APIResponse<RequestBodyDTO, ResponseBodyDTO> {
  return {
    data: response.data.data,
    status: response.status,
    code: response.data.code,
    message: response.data.message,
    headers: response.headers,
    config: response.config,
    request: response.request,
  };
}

/**
 * http get 요청 메서드입니다.
 *
 * @param path - url ex)'/user'
 * @param params - 요청 파라미터(필요 시 axios 공식문서 참고)
 * @param config - 요청 config(필요 시 axios 공식문서 참고)
 */
async function getRequest<ResponseBodyDTO>(
  path: string,
  params?: any,
  config?: AxiosRequestConfig,
) {
  const response = await axiosInstance({
    method: 'GET',
    url: path,
    params,
    ...config,
  });

  return convertToResponse<null, ResponseBodyDTO>(response);
}

/**
 * http post 요청 메서드입니다.
 *
 * @param path - url ex) '/user'
 * @param data - 요청 Body 입니다.
 * @param config - 요청 config 입니다.(필요 시 axios 공식문서 참고)
 */
async function postRequest<RequestBodyDTO, ResponseBodyDTO>(
  path: string,
  data?: RequestBodyDTO,
  config?: AxiosRequestConfig<RequestBodyDTO>,
) {
  const response = await axiosInstance({
    method: 'POST',
    url: path,
    data,
    ...config,
  });

  return convertToResponse<RequestBodyDTO, ResponseBodyDTO>(response);
}

/**
 * http patch 요청 메서드입니다.
 *
 * @param path - url ex) '/user'
 * @param data - 요청 Body 입니다.
 * @param config - 요청 config 입니다.(필요 시 axios 공식문서 참고)
 */
async function patchRequest<RequestBodyDTO, ResponseBodyDTO>(
  path: string,
  data?: RequestBodyDTO,
  config?: AxiosRequestConfig<RequestBodyDTO>,
) {
  const response = await axiosInstance({
    method: 'PATCH',
    url: path,
    data,
    ...config,
  });

  return convertToResponse<RequestBodyDTO, ResponseBodyDTO>(response);
}

/**
 * http put 요청 메서드입니다.
 *
 * @param path - url ex) '/user'
 * @param data - 요청 Body 입니다.
 * @param config - 요청 config 입니다.(필요 시 axios 공식문서 참고)
 */
async function putRequest<RequestBodyDTO, ResponseBodyDTO>(
  path: string,
  data?: RequestBodyDTO,
  config?: AxiosRequestConfig<RequestBodyDTO>,
) {
  const response = await axiosInstance({
    method: 'PUT',
    url: path,
    data,
    ...config,
  });

  return convertToResponse<RequestBodyDTO, ResponseBodyDTO>(response);
}

/**
 * http delete 요청 메서드입니다.
 *
 * @param path - url ex)'/user'
 * @param params - 요청 파라미터(필요 시 axios 공식문서 참고)
 * @param config - 요청 config(필요 시 axios 공식문서 참고)
 */
async function deleteRequest<ResponseBodyDTO>(
  path: string,
  params?: any,
  config?: AxiosRequestConfig,
) {
  const response = await axiosInstance({
    method: 'DELETE',
    url: path,
    params,
    ...config,
  });

  return convertToResponse<null, ResponseBodyDTO>(response);
}

const httpInstance = {
  get: getRequest,
  post: postRequest,
  patch: patchRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default httpInstance;
