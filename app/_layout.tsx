import React, {useEffect} from 'react';
import {Slot, Stack, useRouter, useSegments} from 'expo-router';
import 'expo-dev-client';
import {theme} from '@/src/styles/theme';
import {ThemeProvider} from 'styled-components/native';
import SignUpHeader from '@/src/features/signup/components/layout/SignUpHeader';

function AuthenticationGuard() {
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = false; // 여기에 실제 인증 상태 관리 로직 추가

  // useEffect(() => {
  //   const inAuthGroup = segments[0] === 'auth';
  //   const inTabsGroup = segments[0] === '(tabs)';
  //
  //   // if (!isAuthenticated && !inAuthGroup) {
  //   //   // 인증되지 않은 사용자는 로그인 페이지로
  //   //   router.replace('/login');
  //   // } else if (isAuthenticated && inAuthGroup) {
  //   //   // 인증된 사용자는 홈으로
  //   //   router.replace('/(tabs)/home');
  //   // }
  //   router.replace('/(tabs)/home');
  // }, [isAuthenticated, router, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationGuard />
    </ThemeProvider>
  );
}
