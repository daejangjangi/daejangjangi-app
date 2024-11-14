import httpInstance from '@/src/api/http';
import {
  JoinForm,
  UpdateForm,
  MemberInfo,
  AuthTokens,
  AuthCredentials,
  KakaoAuthCredentials,
} from '@/src/api/types/member.types';

async function checkNicknameDuplicated(nickname: string) {
  const response = await httpInstance.get<null>(`/v1/members/nickname/check/${nickname}`);

  return response;
}

async function checkEmailDuplicated(email: string) {
  const response = await httpInstance.get<null>(`/v1/members/email/check/${email}`);

  return response;
}

async function getMemberInfo() {
  const response = await httpInstance.get<MemberInfo>('/v1/members/info');

  return response;
}

async function login(authCredentials: AuthCredentials) {
  const response = await httpInstance.post<AuthCredentials, AuthTokens>(
    '/v1/members/login',
    authCredentials,
  );

  return response;
}

async function loginWithKakao(authCredentials: {email: string; snsId: string}) {
  const response = await httpInstance.post<KakaoAuthCredentials, AuthTokens>('/v1/socials/login', {
    ...authCredentials,
    provider: 'KAKAO',
  });

  return response;
}

async function join(joinForm: JoinForm) {
  const response = await httpInstance.post<JoinForm, null>('/v1/members/join', joinForm);

  return response;
}

async function updateMemberInfo(updateForm: UpdateForm) {
  const response = await httpInstance.put<UpdateForm, null>('/v1/members', updateForm);

  return response;
}

async function deleteMember() {
  const response = await httpInstance.delete<null>('/v1/members');

  return response;
}

export const MemberApi = {
  checkNicknameDuplicated,
  getMemberInfo,
  checkEmailDuplicated,
  login,
  loginWithKakao,
  join,
  updateMemberInfo,
  deleteMember,
};
