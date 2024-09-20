import React from 'react';
import {Stack} from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='cartoon' />
      <Stack.Screen name='card-news' />
      <Stack.Screen name='news-letter' />
      <Stack.Screen name='reels' />
    </Stack>
  );
}
