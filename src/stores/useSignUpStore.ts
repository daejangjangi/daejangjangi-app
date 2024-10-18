import {create} from 'zustand';
import {Alert} from 'react-native';
import {DISEASES, CATEGORIES} from '@/src/common/data/health-concerns';

type TermsOfService = {
  isOver14: boolean;
  termsOfServiceAgreement: boolean;
  personalDataAgreement: boolean;
  sensitiveDataAgreement: boolean;
  promotionalInfoAgreement: boolean;
};

type BasicInfo = {
  gender: 'MALE' | 'FEMALE' | undefined;
  birthday: Date | undefined;
};

type Disease = (typeof DISEASES)[number];

type Category = (typeof CATEGORIES)[number];

interface SignUpState {
  step: number;
  nickname: string;
  termsOfService: TermsOfService;
  basicInfo: BasicInfo;
  diseases: Disease[];
  categories: Category[];
}

interface SignUpAction {
  handlePrevStep: () => void;
  handleNextStep: () => void;

  updateNickname: (name: string) => void;
  updateTermsOfService: (target: string) => void;
  updateGender: (target: 'MALE' | 'FEMALE') => void;
  updateBirthday: (target: Date) => void;
  updateDiseases: (target: Disease) => void;
  updateCategories: (target: Category) => void;
}

export const useSignUpStore = create<SignUpState & SignUpAction>(set => ({
  step: 1,
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

  handleNextStep: () =>
    set(state => {
      if (state.step === 5) {
        Alert.alert('회원가입 완료');
        return state;
      }
      return {step: state.step + 1};
    }),
  handlePrevStep: () =>
    set(state => {
      if (state.step === 1) {
        Alert.alert('뒤로 돌아갈 수 없음');
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
  updateGender: (target: 'MALE' | 'FEMALE') => {
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
}));
