import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';

const communityRouteMap = {
  board: '커뮤니티',
  post: '게시글',
  write: '글쓰기',
  search: '검색',
  'my-posts': '내가 쓴 글',
  'commented-posts': '댓글 단 글',
};

export default function CommunityLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({route}) => (
          <CommonHeader routeMap={communityRouteMap} routeName={route.name} title='커뮤니티' />
        ),
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='board' />
      <Stack.Screen name='post' />
      <Stack.Screen name='write' />
      <Stack.Screen name='search' />
      <Stack.Screen name='my-posts' />
      <Stack.Screen name='commented-posts' />
    </Stack>
  );
}
