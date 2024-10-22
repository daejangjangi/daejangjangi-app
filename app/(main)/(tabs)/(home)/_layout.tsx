import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';

const homeRouteMap = {
  cartoon: '대장툰',
  'card-news': '카드뉴스',
  'news-letter': '상품추천 뉴스레터',
  reels: '레시피 릴스',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={({route}) => ({
        header: () =>
          route.name !== 'index' && (
            <CommonHeader routeName={route.name} routeMap={homeRouteMap} title='홈' />
          ),
      })}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='cartoon' />
      <Stack.Screen name='card-news' />
      <Stack.Screen name='news-letter' />
      <Stack.Screen name='reels' />
    </Stack>
  );
}
