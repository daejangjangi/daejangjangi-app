import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Link} from 'expo-router';
import {useMemberInfo} from '@/src/hooks/queries/member';

const S = {
  Container: styled.View`
    flex-direction: row;
    gap: 16px;
    padding: 24px 20px;
  `,

  // @Todo: Image로 변경
  ProfileImage: styled.View`
    width: 76px;
    height: 76px;
    border-radius: 38px;
    background-color: ${props => props.theme.colors.textLight};
  `,

  Info: styled.View`
    gap: 4px;
  `,
};

export default function MyPageProfile() {
  const {data: memberInfo} = useMemberInfo();
  const gender = memberInfo?.gender === 'm' ? '남' : '여';

  const getKoreanAge = (birth: string) => {
    const birthYear = Number(birth.split('-')[0]);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear + 1;
  };

  const koreanAge = memberInfo?.birth ? getKoreanAge(memberInfo.birth) : null;

  return (
    <Link href='/others/mypage/profile'>
      <S.Container>
        <S.ProfileImage />

        <S.Info>
          <AppText textType='B2Bold'>{memberInfo?.nickname}님</AppText>
          <AppText textType='B1'>
            {gender} {koreanAge}세
          </AppText>
        </S.Info>
      </S.Container>
    </Link>
  );
}
