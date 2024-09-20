import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';

const marketRouteMap = {
  favorite: '관심 상품',
  search: '검색',
};

export default function MarketLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({route}) => (
          <CommonHeader routeMap={marketRouteMap} routeName={route.name} title='대장간' />
        ),
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='favorite' />
      <Stack.Screen name='search' />
    </Stack>
  );
}
