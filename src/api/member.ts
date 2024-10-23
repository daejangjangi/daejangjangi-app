import httpInstance from '@/src/api/http';

type Gender = 'w' | 'm';
type Disease =
  | '변비'
  | '과민성장증후군_설사형'
  | '과민성장증후군_변비형'
  | '치질'
  | '치핵'
  | '치열'
  | '변실금'
  | '항문소양증'
  | '대장암'
  | '크론병'
  | '궤양성대장염'
  | '복부팽만'
  | '없음';
type Category = '유산균' | '식이섬유' | '저포드맵' | '비건' | '기타_장건강_간식';

async function checkNicknameDuplicated(nickname: string) {
  const response = await httpInstance.get(`/v1/members/nickname/check/${nickname}`);

  return response;
}

async function getMemberInfo() {
  const response = await httpInstance.get('/v1/members/info');

  return response;
}

async function checkEmailDuplicated(email: string) {
  const response = await httpInstance.get(`/v1/members/email/check/${email}`);

  return response;
}

async function login(email: string, password: string) {
  const requestBody = {email, password};
  const response = await httpInstance.post('/v1/members/login', requestBody);

  return response;
}

interface JoinForm {
  email: string;
  password: string;
  nickname: string;
  gender: Gender;
  diseases: Disease[];
  categories: Category[];
}

async function join(joinForm: JoinForm) {
  const response = await httpInstance.post('/v1/members/join', joinForm);

  return response;
}

interface UpdateForm {
  nickname: string;
  birth: string;
  gender: Gender;
  diseases: Disease[];
  categories: Category[];
}

async function updateMemberInfo(updateForm: UpdateForm) {
  const response = await httpInstance.put('/v1/members', updateForm);

  return response;
}

export const MemberApi = {
  checkNicknameDuplicated,
  getMemberInfo,
  checkEmailDuplicated,
  login,
  join,
  updateMemberInfo,
};
