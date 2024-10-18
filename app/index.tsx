import React, {useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import {Link} from 'expo-router';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

const StyledText = styled(AppText)`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.main};
`;

const S = {
  Buttons: styled.View`
    margin-top: 24px;
    gap: 12px;
  `,
};

export default function Index() {
  const [result, setResult] = useState('');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();

      setResult(JSON.stringify(token));

      Alert.alert('카카오 로그인에 성공했습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  const getKakaoProfile = async (): Promise<void> => {
    try {
      const profile: KakaoProfile = await getProfile();

      setResult(JSON.stringify(profile));

      Alert.alert('카카오 프로필을 가져옵니다.');
    } catch (err) {
      console.error(err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();

      setResult(message);

      Alert.alert('카카오 로그아웃합니다.');
    } catch (err) {
      console.error(err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();

      setResult(message);

      Alert.alert('카카오 연동을 해제합니다.');
    } catch (err) {
      console.error(err);
    }
  };

  console.log(result);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText textType='T5'>프리텐다드</StyledText>
      <Link href='/signin'>SignIn</Link>
      <Link href='/signup'>SignUp</Link>
      <Link href='/signup-extra'>signup-extra</Link>
      <Link href='/(tabs)'>tabs</Link>

      <S.Buttons>
        <Pressable onPress={signInWithKakao}>
          <Text>카카오 로그인</Text>
        </Pressable>

        <Pressable onPress={getKakaoProfile}>
          <Text>카카오 프로필 가져오기</Text>
        </Pressable>

        <Pressable onPress={signOutWithKakao}>
          <Text>카카오 로그아웃</Text>
        </Pressable>

        <Pressable onPress={unlinkKakao}>
          <Text>카카오 연동 해제</Text>
        </Pressable>
      </S.Buttons>
    </View>
  );
}
