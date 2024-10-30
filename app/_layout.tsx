import React from 'react';
import {Slot} from 'expo-router';
import 'expo-dev-client';
import {theme} from '@/src/styles/theme';
import {ThemeProvider} from 'styled-components/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@/src/lib/react-query';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
