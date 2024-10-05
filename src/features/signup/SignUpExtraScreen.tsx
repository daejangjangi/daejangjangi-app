import React, {useState} from 'react';
import {Alert, Text} from 'react-native';
import styled from 'styled-components/native';
import SignUpExtraHeader from '@/src/features/signup/components/SignUpExtraHeader';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    background-color: #fff;
    flex: 1;
    padding: 20px;
  `,

  Buttons: styled.View`
    position: absolute;
    bottom: 45px;
    left: 20px;

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

export default function SignUpExtraScreen() {
  const [step, setStep] = useState(0);
  const handleNextStep = () => {
    if (step === 5) {
      Alert.alert('Last!');
      return;
    }
    setStep(prev => prev + 1);
  };
  const handlePrevStep = () => {
    if (step === 0) {
      Alert.alert('First!');
      return;
    }
    setStep(prev => prev - 1);
  };

  return (
    <S.Container>
      <SignUpExtraHeader step={step} />

      <Text>{step}</Text>

      <S.Buttons>
        <S.Button onPress={() => handlePrevStep()} $sub>
          <S.ButtonText textType='B3' $sub>
            이전
          </S.ButtonText>
        </S.Button>
        <S.Button onPress={() => handleNextStep()}>
          <S.ButtonText textType='B3'>다음</S.ButtonText>
        </S.Button>
      </S.Buttons>
    </S.Container>
  );
}
