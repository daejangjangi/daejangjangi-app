import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import DiagnosisStepper from './components/DiagnosisStepper';
import StoolImageSelectStep from './components/StoolImageSelectStep';
import StoolFormStep from './components/StoolFormStep';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
    background-color: #fff;
  `,

  Footer: styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: #fff;
  `,

  NextButton: styled.TouchableOpacity`
    width: 100%;
    height: 56px;
    background-color: ${props => props.theme.colors.mainLight};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  `,
};

const MIN_STEP = 1;
const MAX_STEP = 3;

export default function DiagnosisScreen() {
  const [step, setStep] = useState(MIN_STEP);
  const [image, setImage] = useState<string | null>(null);

  const handleNextStep = () => {
    if (step < MAX_STEP) {
      setStep(prev => prev + 1);
    }
  };

  return (
    <>
      <S.Container>
        <DiagnosisStepper step={step} maxStep={MAX_STEP} />
        {step === 1 && <StoolImageSelectStep image={image} onChangeImage={setImage} />}
        {step === 2 && <StoolFormStep />}
      </S.Container>

      <S.Footer>
        <S.NextButton onPress={handleNextStep}>
          <AppText textType='B2' colorType='main'>
            다음으로
          </AppText>
        </S.NextButton>
      </S.Footer>
    </>
  );
}
