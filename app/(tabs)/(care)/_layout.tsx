import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';

const careRouteMap = {
  diagnosis: '배변 분석 AI',
  'diagnosis-result': '결과보기',
};

export default function CareLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({route}) => (
          <CommonHeader routeMap={careRouteMap} routeName={route.name} title='배변일지' />
        ),
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='diagnosis' />
      <Stack.Screen name='diagnosis-result' />
    </Stack>
  );
}
