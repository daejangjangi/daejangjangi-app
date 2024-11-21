import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcDiagnosis} from '@/assets/images/icons';
import {useRouter} from 'expo-router';
import DiagnosisStepper from './components/DiagnosisStepper';
import StoolImageSelectStep from './components/StoolImageSelectStep';
import StoolFormStep from './components/StoolFormStep';
import StoolExtraFormStep from './components/StoolExtraFormStep';

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

  NextButton: styled.TouchableOpacity<{isSubmit: boolean}>`
    flex-direction: row;
    gap: 8px;
    align-items: center;
    width: 100%;
    height: 56px;
    background-color: ${props =>
      props.isSubmit ? props.theme.colors.main : props.theme.colors.mainLight};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  `,

  NextButtonText: styled(AppText)<{isSubmit: boolean}>`
    color: ${props => (props.isSubmit ? '#fff' : props.theme.colors.main)};
  `,
};

const MIN_STEP = 1;
const MAX_STEP = 3;

export default function DiagnosisScreen() {
  const router = useRouter();
  const [step, setStep] = useState(MIN_STEP);
  const [image, setImage] = useState<string | null>(null);

  const isSubmit = step === MAX_STEP;

  const handleNextStep = () => {
    if (step < MAX_STEP) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log('진단 제출');
    router.replace('/care/diagnosis-result');
  };

  return (
    <>
      <S.Container>
        <DiagnosisStepper step={step} maxStep={MAX_STEP} />
        {step === 1 && <StoolImageSelectStep image={image} onChangeImage={setImage} />}
        {step === 2 && <StoolFormStep />}
        {step === 3 && <StoolExtraFormStep />}
      </S.Container>

      <S.Footer>
        <S.NextButton onPress={isSubmit ? handleSubmit : handleNextStep} isSubmit={isSubmit}>
          {isSubmit && <IcDiagnosis color='#fff' />}
          <S.NextButtonText textType='B2' isSubmit={isSubmit}>
            {isSubmit ? '전문 AI 도움받기' : '다음으로'}
          </S.NextButtonText>
        </S.NextButton>
      </S.Footer>
    </>
  );
}
