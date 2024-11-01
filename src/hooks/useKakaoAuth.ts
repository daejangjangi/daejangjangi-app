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
      return token;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const getKakaoProfile = async (): Promise<KakaoProfile | undefined> => {
    try {
      const profile = await getProfile();
      return profile;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const signOutWithKakao = async (): Promise<string | undefined> => {
    try {
      const message = await logout();
      return message;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const unlinkKakao = async (): Promise<string | undefined> => {
    try {
      const message = await unlink();
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
