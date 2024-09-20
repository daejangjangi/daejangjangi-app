import React from 'react';
import {Stack} from 'expo-router';

export default function CommunityLayout() {
  return (
    <Stack>
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
