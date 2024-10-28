import React from 'react';
import {Stack} from 'expo-router';
import CommonHeader from '@/src/common/headers';

const notificationRouteMap = {
  index: '알림',
};

export default function NotificationLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({route}) => (
          <CommonHeader routeMap={notificationRouteMap} routeName={route.name} title='알림' />
        ),
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
}
