import React from 'react';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  `,

  Step: styled.View<{$filled: boolean}>`
    flex: 1;
    height: 4px;
    border-radius: 12px;
    background-color: ${({theme, $filled}) =>
      $filled ? theme.colors.main : theme.colors.textLight};
  `,
};

interface DiagnosisStepperProps {
  step: number;
  maxStep: number;
}

export default function DiagnosisStepper({step, maxStep}: DiagnosisStepperProps) {
  return (
    <S.Container>
      {Array.from({length: maxStep}, (_, index) => (
        <S.Step key={`diagnosis-step-${index + 1}`} $filled={step > index} />
      ))}
    </S.Container>
  );
}
