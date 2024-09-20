import React from 'react';
import {Stack} from 'expo-router';

export default function MarketLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='favorite' />
      <Stack.Screen name='search' />
    </Stack>
  );
}
