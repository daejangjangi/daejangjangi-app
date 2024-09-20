import React from 'react';
import {Stack} from 'expo-router';

export default function MyPageLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='profile' />
      <Stack.Screen name='faq' />
      <Stack.Screen name='account' />
    </Stack>
  );
}
