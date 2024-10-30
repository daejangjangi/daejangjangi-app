import {JoinForm} from '@/src/api/types/member.types';
import {SignUpState} from '@/src/stores/useSignUpStore';

const DISEASE_MAPPING: Record<string, string> = {
  변비: '변비',
  치질: '치질',
  '과민성 장 증후군\n(설사 우세형)': '과민성장증후군_설사형',
  '과민성 장 증후군\n(변비 우세형)': '과민성장증후군_변비형',
  치핵: '치핵',
  치루: '치루',
  치열: '치열',
  변실금: '변실금',
  항문소양증: '항문소양증',
  대장암: '대장암',
  크론병: '크론병',
  '궤양성 대장염': '궤양성대장염',
  복부팽만: '복부팽만',
  없음: '없음',
};

const CATEGORY_MAPPING: Record<string, string> = {
  유산균: '유산균',
  식이섬유: '식이섬유',
  저포드맵: '저포드맵',
  비건: '비건',
  '기타 장건강 간식': '기타_장건강_간식',
};

export function convertSignUpStateToJoinForm(state: SignUpState): JoinForm {
  const birthdayYear = state.basicInfo.birthday?.getFullYear() ?? '';
  const birthdayMonth = (state.basicInfo.birthday?.getMonth() ?? -1) + 1;
  const birthdayDate = state.basicInfo.birthday?.getDate() ?? '';

  return {
    email: state.email,
    password: state.password,
    nickname: state.nickname,
    gender: state.basicInfo.gender,
    birth: `${birthdayYear}-${birthdayMonth}-${birthdayDate}`,
    diseases: state.diseases.map(disease => DISEASE_MAPPING[disease]),
    categories: state.categories.map(category => CATEGORY_MAPPING[category]),
  };
}
