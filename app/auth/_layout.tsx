import React from 'react';
import {Stack} from 'expo-router';
import SignUpHeader from '@/src/features/signup/components/layout/SignUpHeader';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='signin' />
      <Stack.Screen name='signup' options={{headerShown: true, header: () => <SignUpHeader />}} />
      <Stack.Screen name='signup-extra' />
    </Stack>
  );
}
