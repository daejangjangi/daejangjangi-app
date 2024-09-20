import React from 'react';
import {Stack} from 'expo-router';

export default function CareLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='diagnosis' />
      <Stack.Screen name='diagnosis-result' />
    </Stack>
  );
}
