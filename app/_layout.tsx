import React from 'react';
import {Stack} from 'expo-router';
import 'expo-dev-client';
import {theme} from '@/src/styles/theme';
import {ThemeProvider} from 'styled-components/native';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index' />
        <Stack.Screen name='signin' />
        <Stack.Screen name='signup' />
        <Stack.Screen name='(main)' />
      </Stack>
    </ThemeProvider>
  );
}
