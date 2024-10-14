import {create} from 'zustand';
import {Alert} from 'react-native';

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

/**
 * @TODO: 장 건강 관련 질환 목록 추가
 */
type Concern = '1' | '2';

/**
 * @TODO: 장 건강 관련 상품 목록 추가
 */
type Product = '1' | '2';

interface SignUpState {
  step: number;
  nickname: string;
  termsOfService: TermsOfService;
  basicInfo: BasicInfo;
  concerns: Concern[];
  products: Product[];
}

interface SignUpAction {
  handlePrevStep: () => void;
  handleNextStep: () => void;

  updateNickname: (name: string) => void;
  updateTermsOfService: (target: string) => void;
  updateGender: (target: 'MALE' | 'FEMALE') => void;
  updateBirthday: (target: Date) => void;
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
  concerns: [],
  products: [],

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
}));
