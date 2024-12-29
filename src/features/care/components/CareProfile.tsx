import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {AppText} from '@/src/common/AppComponents';
import {useMemberInfo} from '@/src/hooks/queries/member';
import {useRouter} from 'expo-router';

const S = {
  Container: styled.Pressable`
    flex-direction: row;
    align-items: center;
    padding: 20px 12px;
    gap: 12px;
    background-color: #fff;
    border-radius: 12px;
  `,

  ProfileImage: styled.View`
    width: 70px;
    height: 70px;
    border-radius: 100px;
    background-color: ${props => props.theme.colors.textLight};
  `,

  InfoContainer: styled.View`
    gap: 4px;
  `,

  BadgeContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  Badge: styled.View`
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.mainLight};
  `,
};

function Badge({text}: {text: string}) {
  return (
    <S.Badge>
      <AppText textType='C2' colorType='main'>
        {text}
      </AppText>
    </S.Badge>
  );
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
};

export default function CareProfile() {
  const router = useRouter();
  const {data} = useMemberInfo();

  const age = data?.birth ? calculateAge(data.birth) : 0;
  const gender = data?.gender === 'm' ? '남' : '여';
  const diseases = data?.diseases ?? [];

  const handlePress = () => {
    router.push('/others/mypage/profile');
  };

  return (
    <S.Container onPress={handlePress}>
      <S.ProfileImage source='https://placehold.co/70' />

      <S.InfoContainer>
        <AppText textType='B2Bold'>{data?.nickname}</AppText>
        <AppText textType='B1'>{`${gender} 만 ${age}세`}</AppText>
        <S.BadgeContainer>
          {diseases.slice(0, 2).map(disease => (
            <Badge key={disease} text={disease} />
          ))}
          {diseases.length > 2 && (
            <AppText textType='C2' colorType='textMedium'>
              외 {diseases.length - 2}
            </AppText>
          )}
        </S.BadgeContainer>
      </S.InfoContainer>
    </S.Container>
  );
}
