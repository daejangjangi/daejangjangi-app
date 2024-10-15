import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useSignUpStore} from '@/src/stores';
import {useRouter} from 'expo-router';

const S = {
  Buttons: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  `,

  Button: styled.Pressable<{$sub?: boolean}>`
    flex: 1;
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${props =>
      props.$sub ? props.theme.colors.textLight : props.theme.colors.main};
  `,

  ButtonText: styled(AppText)<{$sub?: boolean}>`
    color: ${props => (props.$sub ? props.theme.colors.textMedium : '#fff')};
  `,
};

export default function SignUpExtraFooter() {
  const router = useRouter();
  const {step, handlePrevStep, handleNextStep} = useSignUpStore(state => state);

  const goPrevStep = () => {
    if (step === 1) {
      router.back();
      return;
    }

    handlePrevStep();
  };

  const goNextStep = () => {
    if (step === 5) {
      // 회원가입 완료 로직 추가
    }

    handleNextStep();
  };

  return (
    <S.Buttons>
      <S.Button onPress={() => goPrevStep()} $sub>
        <S.ButtonText textType='B3' $sub>
          이전
        </S.ButtonText>
      </S.Button>
      <S.Button onPress={() => goNextStep()}>
        <S.ButtonText textType='B3'>다음</S.ButtonText>
      </S.Button>
    </S.Buttons>
  );
}
