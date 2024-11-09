import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';

const myPageRouteMap = {
  index: '내 정보',
  profile: '정보 수정',
  faq: '자주 묻는 질문',
  account: '계정',
  notification: '알림',
  qna: '문의하기',
  'qna-write': '문의하기',
  'qna-detail': '문의하기',
};

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({route}) => (
          <CommonHeader routeMap={myPageRouteMap} routeName={route.name} title='내 정보' />
        ),
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='profile' />
      <Stack.Screen name='faq' />
      <Stack.Screen name='account' />
      <Stack.Screen name='qna' />
      <Stack.Screen name='qna-write' />
      <Stack.Screen name='qna-detail' />
    </Stack>
  );
}
