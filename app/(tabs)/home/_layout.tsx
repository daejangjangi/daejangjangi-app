import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';
import CartoonDetailHeader from '@/src/features/home/cartoon/components/CartoonDetailHeader';

const homeRouteMap = {
  cartoon: '대장툰',
  'card-news': '카드뉴스',
  'news-letter': '상품추천 뉴스레터',
  'news-letter/[id]': '상품추천 뉴스레터',
  reels: '레시피 릴스',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={({route}) => ({
        header: () => {
          if (route.name.includes('[episode]')) {
            return (
              <CartoonDetailHeader episode={route.params?.episode} title={route.params?.title} />
            );
          }
          return (
            route.name !== 'index' && (
              <CommonHeader routeName={route.name} routeMap={homeRouteMap} title='홈' />
            )
          );
        },
      })}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='cartoon' />
      <Stack.Screen name='cartoon/[episode]' />
      <Stack.Screen name='card-news' />
      <Stack.Screen name='news-letter' />
      <Stack.Screen name='news-letter/[id]' />
      <Stack.Screen name='reels' />
    </Stack>
  );
}
