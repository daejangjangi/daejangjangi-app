import React from 'react';
import {Stack} from 'expo-router';
import 'expo-dev-client';
import {theme} from '@/src/styles/theme';
import {ThemeProvider} from 'styled-components/native';
import SignUpHeader from '@/src/features/signup/components/SignUpHeader';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='signin' />
        <Stack.Screen name='signup' options={{headerShown: true, header: () => <SignUpHeader />}} />
        <Stack.Screen name='signup-extra' />
        <Stack.Screen name='(main)' />
      </Stack>
    </ThemeProvider>
  );
}
