import {create} from 'zustand';
import {Alert} from 'react-native';
import {CATEGORIES, DISEASES} from '@/src/common/data/health-concerns';
import {Gender} from '../api/types/member.types';

type TermsOfService = {
  isOver14: boolean;
  termsOfServiceAgreement: boolean;
  personalDataAgreement: boolean;
  sensitiveDataAgreement: boolean;
  promotionalInfoAgreement: boolean;
};

type BasicInfo = {
  gender: Gender | undefined;
  birthday: Date | undefined;
};

type Disease = (typeof DISEASES)[number];

type Category = (typeof CATEGORIES)[number];

interface SignUpState {
  step: number;
  canGoNext: [boolean, boolean, boolean, boolean, boolean];

  email: string;
  password: string;
  nickname: string;
  termsOfService: TermsOfService;
  basicInfo: BasicInfo;
  diseases: Disease[];
  categories: Category[];
}

interface SignUpAction {
  handlePrevStep: () => void;
  handleNextStep: () => void;
  updateCanGoNext: (step: number, can: boolean) => void;

  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updateNickname: (name: string) => void;
  updateTermsOfService: (target: string) => void;
  updateGender: (target: 'm' | 'w') => void;
  updateBirthday: (target: Date) => void;
  updateDiseases: (target: Disease) => void;
  updateCategories: (target: Category) => void;
  clear: () => void;
}

const ERROR_MESSAGES = {
  1: '닉네임 중복확인을 완료해주세요.',
  2: '필수 약관에 모두 동의해주세요.',
  3: '성별과 생년월일을 모두 입력해주세요.',
  4: '장 건강 관련 질환을 1개 이상 선택해주세요.',
  5: '관심있는 장 건강 관련 상품을 1개 이상 선택해주세요.',
} as const;

export const useSignUpStore = create<SignUpState & SignUpAction>(set => ({
  step: 1,
  canGoNext: [false, false, false, false, false],

  email: '',
  password: '',
  nickname: '',
  termsOfService: {
    isOver14: false,
    termsOfServiceAgreement: false,
    personalDataAgreement: false,
    sensitiveDataAgreement: false,
    promotionalInfoAgreement: false,
  },
  basicInfo: {
    gender: undefined,
    birthday: undefined,
  },
  diseases: [],
  categories: [],

  updateCanGoNext: (step: number, can: boolean) =>
    set(state => {
      const newCanGoNext = state.canGoNext;
      newCanGoNext[step - 1] = can;

      return {canGoNext: newCanGoNext};
    }),
  handleNextStep: () =>
    set(state => {
      if (!state.canGoNext[state.step - 1]) {
        Alert.alert('알림', ERROR_MESSAGES[state.step as keyof typeof ERROR_MESSAGES]);
        return state;
      }

      if (state.step === 5) {
        Alert.alert('알림', '회원가입이 완료되었습니다.');
        console.log(state);

        return state;
      }
      return {step: state.step + 1};
    }),
  handlePrevStep: () =>
    set(state => {
      if (state.step === 1) {
        Alert.alert('알림', '첫 단계입니다.');
        return state;
      }
      return {step: state.step - 1};
    }),
  updateNickname: (input: string) => set(() => ({nickname: input})),
  updateTermsOfService: (target: string) =>
    set(state => ({
      termsOfService: {
        ...state.termsOfService,
        [target]: !state.termsOfService[target],
      },
    })),
  updateGender: (target: 'm' | 'w') => {
    set(state => ({
      basicInfo: {
        ...state.basicInfo,
        gender: target,
      },
    }));
  },
  updateBirthday: (target: Date) => {
    set(state => ({
      basicInfo: {
        ...state.basicInfo,
        birthday: target,
      },
    }));
  },
  updateDiseases: (target: Disease) => {
    set(state => {
      const newDiseases = state.diseases.includes(target)
        ? state.diseases.filter(d => d !== target)
        : state.diseases.concat(target);

      return {
        diseases: newDiseases,
      };
    });
  },
  updateCategories: (target: Category) => {
    set(state => {
      const newDiseases = state.categories.includes(target)
        ? state.categories.filter(c => c !== target)
        : state.categories.concat(target);

      return {
        categories: newDiseases,
      };
    });
  },
  updateEmail: (email: string) => set({email}),
  updatePassword: (password: string) => set({password}),
  clear: () =>
    set({
      step: 1,
      canGoNext: [false, false, false, false, false],
      email: '',
      password: '',
      nickname: '',
      termsOfService: {
        isOver14: false,
        termsOfServiceAgreement: false,
        personalDataAgreement: false,
        sensitiveDataAgreement: false,
        promotionalInfoAgreement: false,
      },
      basicInfo: {
        gender: undefined,
        birthday: undefined,
      },
      diseases: [],
      categories: [],
    }),
}));
