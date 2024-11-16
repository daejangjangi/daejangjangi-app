import React, {useEffect} from 'react';
import {Redirect} from 'expo-router';
import {useAuthStore} from '@/src/stores/auth';
import {useMemberInfo, useLogin} from '@/src/hooks/queries/member';
import {useQueryClient} from '@tanstack/react-query';

export default function Index() {
  const {isLoggedIn, setTokens} = useAuthStore();
  const {refetch} = useMemberInfo();
  const {mutateAsync: login} = useLogin();
  const queryClient = useQueryClient();

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

    if (!isLoggedIn) {
      autoLogin();
    }
  }, [isLoggedIn, login, queryClient, setTokens]);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  if (isLoggedIn) {
    return <Redirect href='/(tabs)/home' />;
  }

  return null;
}
