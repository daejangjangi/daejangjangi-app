import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {AuthTokens} from '@/src/api/types/member.types';

interface AuthState {
  tokens: AuthTokens | null;
  isLoggedIn: boolean;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      tokens: null,
      isLoggedIn: false,
      setTokens: tokens => set({tokens, isLoggedIn: true}),
      clearTokens: () => set({tokens: null, isLoggedIn: false}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
