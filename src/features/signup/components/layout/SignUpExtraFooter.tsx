import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useSignUpStore} from '@/src/stores';

const S = {
  Buttons: styled.View`
    //position: absolute;
    //bottom: 45px;
    //left: 20px;
    margin-bottom: 30px;

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
  const {handlePrevStep, handleNextStep} = useSignUpStore(state => state);

  return (
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
  );
}
