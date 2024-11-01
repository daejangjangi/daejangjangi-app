import React, {useEffect} from 'react';
import {Redirect} from 'expo-router';
import {useAuthStore} from '@/src/stores/auth';
import {useMemberInfo} from '@/src/hooks/queries/member';

export default function Index() {
  const {isLoggedIn} = useAuthStore();
  const {refetch} = useMemberInfo();

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  // 로그인 상태에 따라 적절한 화면으로 리다이렉트
  if (isLoggedIn) {
    return <Redirect href='/(tabs)/home' />;
  }

  return <Redirect href='/auth/signin' />;
}
