/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosResponseHeaders,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @TODO: accessToken 헤더 관련 구현 필요
 */
axiosInstance.interceptors.request.use(async config => config);

/**
 * @TODO: 인증 처리 실패 구현 필요
 */
axiosInstance.interceptors.response.use(
  res => res,
  async err => Promise.reject(err),
);

/**
 * @TODO: 백엔드 응답형식 결정되면 변경 필요
 */
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
