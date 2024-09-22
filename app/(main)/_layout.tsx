import React from 'react';
import {Stack} from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(mypage)' />
      <Stack.Screen name='(notification)' />
    </Stack>
  );
}
