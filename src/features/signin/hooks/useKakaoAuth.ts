import {Alert} from 'react-native';
import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

export function useKakaoAuth() {
  const signInWithKakao = async (): Promise<KakaoOAuthToken | undefined> => {
    try {
      const token = await login();
      Alert.alert('카카오 로그인에 성공했습니다.');
      return token;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const getKakaoProfile = async (): Promise<KakaoProfile | undefined> => {
    try {
      const profile = await getProfile();
      Alert.alert('카카오 프로필을 가져옵니다.');
      return profile;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const signOutWithKakao = async (): Promise<string | undefined> => {
    try {
      const message = await logout();
      Alert.alert('카카오 로그아웃합니다.');
      return message;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const unlinkKakao = async (): Promise<string | undefined> => {
    try {
      const message = await unlink();
      Alert.alert('카카오 연동을 해제합니다.');
      return message;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  return {
    signInWithKakao,
    getKakaoProfile,
    signOutWithKakao,
    unlinkKakao,
  };
}
