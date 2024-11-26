import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {Redirect} from 'expo-router';
import {useAuthStore} from '@/src/stores/auth';
import {useMemberInfo, useLogin} from '@/src/hooks/queries/member';
import {useQueryClient} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';

export default function Index() {
  const {isLoggedIn, setTokens} = useAuthStore();
  const {refetch} = useMemberInfo();
  const {mutateAsync: login} = useLogin();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAndRequestNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (!granted) {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
          }
        } catch (error) {
          console.error('알림 권한 요청 실패:', error);
        }
      }
    };

    checkAndRequestNotificationPermission();
  }, []);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await login({
          email: 'test@test.com',
          password: '@@Test1234',
        });

        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });

        await queryClient.invalidateQueries({queryKey: ['member', 'info']});
      } catch (error) {
        console.error('자동 로그인 실패:', error);
      }
    };

    autoLogin();
  }, [login, queryClient, setTokens]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const setupFCM = async () => {
      // Foreground 메시지 핸들러
      const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
        // 알림 목록 최신화 하기
        console.log('Foreground message:', remoteMessage);
      });

      // Background 메시지 핸들러
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Background message:', remoteMessage);
      });

      return () => {
        unsubscribeForeground();
      };
    };

    setupFCM();
  }, []);

  if (isLoggedIn) {
    return <Redirect href='/(tabs)/home' />;
  }

  return null;
}
