import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcKakao} from '@/assets/images/icons';
import {Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuthStore} from '@/src/stores/auth';
import {memberKeys, useKakaoLogin} from '@/src/hooks/queries/member';
import {useSignUpStore} from '@/src/stores';
import {useQueryClient} from '@tanstack/react-query';
import {useKakaoAuth} from '../../../hooks/useKakaoAuth';
import messaging from '@react-native-firebase/messaging';
import {FcmApi} from '@/src/api/fcm.api';

const S = {
  Button: styled.Pressable`
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    border-radius: 8px;
    background-color: #fee500;
    opacity: ${props => (props.$disabled ? 0.5 : 1)};
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
  const router = useRouter();
  const {signInWithKakao, getKakaoProfile} = useKakaoAuth();
  const {mutateAsync: login, isPending} = useKakaoLogin();
  const {setTokens} = useAuthStore();
  const {updateEmail} = useSignUpStore();
  const queryClient = useQueryClient();

  const loginWithKakao = async (email: string, id: number) => {
    try {
      const response = await login({email, snsId: id.toString()});
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      // FCM 토큰 등록
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await FcmApi.postFcmToken(fcmToken);
      }

      await queryClient.invalidateQueries();
      router.replace('/(tabs)/home');
    } catch (error) {
      if (error.response.data.code === 'NOT_FOUND_MEMBER') {
        Alert.alert('존재하지 않는 회원입니다. 회원가입을 진행해주세요.');
        updateEmail(email);
        router.push('/auth/signup');
      } else {
        console.error(error);
        Alert.alert('로그인 실패', '카카오 로그인에 실패했습니다.');
      }
    }
  };

  const handlePress = async () => {
    if (isPending) return;

    const signInData = await signInWithKakao();
    if (signInData?.accessToken) {
      const profile = await getKakaoProfile();
      if (profile?.email && profile?.id) {
        await loginWithKakao(profile.email, profile.id);
      }
    }
  };

  return (
    <S.Button onPress={handlePress} $disabled={isPending}>
      <S.Logo />
      <S.Text textType='B2Bold'>{isPending ? '로그인 중...' : '카카오 로그인'}</S.Text>
    </S.Button>
  );
}
