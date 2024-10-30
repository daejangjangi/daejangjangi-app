export type Gender = 'w' | 'm';
export type Disease =
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
export type Category = '유산균' | '식이섬유' | '저포드맵' | '비건' | '기타_장건강_간식';

export interface MemberInfo {
  nickname: string;
  birth: string;
  gender: Gender;
  diseases: Disease[];
  categories: Category[];
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type JoinForm = MemberInfo & AuthCredentials;
export type UpdateForm = Partial<MemberInfo>;
