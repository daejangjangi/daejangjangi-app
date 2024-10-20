import 'dotenv/config';
import {ExpoConfig, ConfigContext} from '@expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  name: 'daejangjangi-app',
  slug: 'daejangjangi-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.daejangjangi',
    // strings: {
    //   app_name: 'daejangjangi',
    // },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Pretendard-Thin.otf',
          './assets/fonts/Pretendard-ExtraLight.otf',
          './assets/fonts/Pretendard-Light.otf',
          './assets/fonts/Pretendard-Regular.otf',
          './assets/fonts/Pretendard-Medium.otf',
          './assets/fonts/Pretendard-SemiBold.otf',
          './assets/fonts/Pretendard-Bold.otf',
          './assets/fonts/Pretendard-ExtraBold.otf',
          './assets/fonts/Pretendard-Black.otf',
          './assets/fonts/NanumSquareNeo-Light.otf',
          './assets/fonts/NanumSquareNeo-Regular.otf',
          './assets/fonts/NanumSquareNeo-Bold.otf',
          './assets/fonts/NanumSquareNeo-ExtraBold.otf',
          './assets/fonts/NanumSquareNeo-Heavy.otf',
        ],
      },
    ],
    'expo-build-properties',
    [
      '@react-native-seoul/kakao-login',
      {
        kakaoAppKey: process.env.KAKAO_API_KEY, // .env 값 불러오기
        overrideKakaoSDKVersion: '2.11.2',
        kotlinVersion: '1.9.0',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: '39628c78-adc7-4268-aaaf-a4f7012b9134',
    },
  },
  owner: 'daejangjangi',
});
