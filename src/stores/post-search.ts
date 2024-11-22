import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

const RECENT_KEYWORDS_KEY = 'recent_keywords';
const MAX_RECENT_KEYWORDS = 5;

interface PostSearchStore {
  keyword: string;
  recentKeywords: string[];
  isFocused: boolean;
  setKeyword: (keyword: string) => void;
  removeRecentKeyword: (keyword: string) => void;
  setIsFocused: (isFocused: boolean) => void;
  addRecentKeyword: (keyword: string) => void;
  initializeRecentKeywords: () => Promise<void>;
}

export const usePostSearchStore = create<PostSearchStore>((set, get) => ({
  keyword: '',
  recentKeywords: [],
  isFocused: false,

  setKeyword: keyword => {
    set({keyword});
    if (keyword.trim()) {
      get().addRecentKeyword(keyword);
    }
  },

  addRecentKeyword: async keyword => {
    const {recentKeywords} = get();
    const trimmedKeyword = keyword.trim();

    // 중복 제거 및 최신 키워드를 앞으로 이동
    const filteredKeywords = recentKeywords.filter(k => k !== trimmedKeyword);
    const newKeywords = [trimmedKeyword, ...filteredKeywords].slice(0, MAX_RECENT_KEYWORDS);

    set({recentKeywords: newKeywords});
    await AsyncStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(newKeywords));
  },

  removeRecentKeyword: async keyword => {
    const newKeywords = get().recentKeywords.filter(k => k !== keyword);
    set({recentKeywords: newKeywords});
    await AsyncStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(newKeywords));
  },

  setIsFocused: isFocused => set({isFocused}),

  initializeRecentKeywords: async () => {
    try {
      const storedKeywords = await AsyncStorage.getItem(RECENT_KEYWORDS_KEY);
      if (storedKeywords) {
        set({recentKeywords: JSON.parse(storedKeywords)});
      }
    } catch (error) {
      console.error('Failed to load recent keywords:', error);
    }
  },
}));
