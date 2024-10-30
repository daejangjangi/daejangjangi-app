import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcKakao} from '@/assets/images/icons';
import {useKakaoAuth} from '../hooks/useKakaoAuth';

const S = {
  Button: styled.Pressable`
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    border-radius: 8px;
    background-color: #fee500;
  `,

  Text: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  Logo: styled(IcKakao)`
    position: absolute;
    left: 16px;
  `,
};

export default function KakaoLoginbutton() {
  const {signInWithKakao} = useKakaoAuth();

  const handlePress = async () => {
    const token = await signInWithKakao();
    if (token) {
      // @Todo: 카카오 로그인 성공 후 처리
      console.log('Kakao login success:', token);
    }
  };

  return (
    <S.Button onPress={handlePress}>
      <S.Logo />
      <S.Text textType='B2Bold'>카카오 로그인</S.Text>
    </S.Button>
  );
}
