import React from 'react';
import {Stack} from 'expo-router';
import 'expo-dev-client';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index' />
      <Stack.Screen name='signin' />
      <Stack.Screen name='signup' />
      <Stack.Screen name='(main)' />
    </Stack>
  );
}
