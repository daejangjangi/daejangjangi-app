import React, {useState} from 'react';
import styled from 'styled-components/native';
import DiagnosisStepper from './components/DiagnosisStepper';
import StoolImageSelectStep from './components/StoolImageSelectStep';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
    background-color: #fff;
  `,
};

const MIN_STEP = 1;
const MAX_STEP = 3;

export default function DiagnosisScreen() {
  const [step, setStep] = useState(MIN_STEP);
  const [image, setImage] = useState<string | null>(null);

  return (
    <S.Container>
      <DiagnosisStepper step={step} maxStep={MAX_STEP} />

      <StoolImageSelectStep image={image} onChangeImage={setImage} />
    </S.Container>
  );
}
