import React, {useState, useRef, useCallback} from 'react';
import {Alert, Animated} from 'react-native';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcDiagnosis} from '@/assets/images/icons';
import {useRouter, useFocusEffect} from 'expo-router';
import {useStoolDiagnosisStore} from '@/src/stores/stool-diagnosis.store';
import {useStoolDiagnosis, useStoolImageAnalysis} from '@/src/hooks/queries/care';
import {LoadingOverlay} from '@/src/common/LoadingOverlay';
import {DiagnosisStoolImageRequest} from '@/src/api/types/care.type';
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    form,
    color,
    mucus,
    proteinLumps,
    isBloody,
    bloodyStoolDescription,
    additionalDescription,
    dietType,
    dietDescription,
    stoolAt,
    setForm,
    setColor,
    setMucus,
    setProteinLumps,
    setIsBloody,
    setIsAnalyzed,
    reset,
  } = useStoolDiagnosisStore();
  const {mutateAsync: analyzeStoolImage} = useStoolImageAnalysis();
  const {mutateAsync: diagnosisStool} = useStoolDiagnosis();

  const slideAnim = useRef(new Animated.Value(0)).current;

  const isSubmit = step === MAX_STEP;

  const animateTransition = (nextStep: number) => {
    const direction = nextStep > step ? 1 : -1;

    Animated.timing(slideAnim, {
      toValue: -direction * 400,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setStep(nextStep);
      slideAnim.setValue(direction * 400);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNextStep = async () => {
    if (step === 1 && image) {
      try {
        setIsAnalyzing(true);
        const response = await analyzeStoolImage(image);
        setForm(response.form);
        setColor(response.color);
        setMucus(response.mucus);
        setProteinLumps(response.proteinLumps);
        setIsBloody(response.isBloody);
        setIsAnalyzed(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsAnalyzing(false);
      }
    }

    if (step < MAX_STEP) {
      animateTransition(step + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const diagnosisRequest: DiagnosisStoolImageRequest = {
        stools: [
          {
            stoolAt,
            color,
            form,
            isBloody: isBloody ?? false,
            bloodyStoolDescription,
            proteinLumps,
            mucus,
          },
        ],
        additionalDescription,
        dietType,
        dietDescription,
      };

      setIsAnalyzing(true);
      const response = await diagnosisStool(diagnosisRequest);
      const diagnosisDescription = response.user_language;

      router.replace({
        pathname: '/care/diagnosis-result',
        params: {
          diagnosisDescription,
          stoolDiagnose: JSON.stringify(diagnosisRequest),
          // TODO: 이미지 url 반환로직 백엔드에서 구현 시 반영이 필요합니다.
          stoolImageUrl: null,
        },
      });
    } catch (error) {
      console.error('진단 실패:', error);
      Alert.alert('오류', '진단 중 문제가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 화면 이탈 시 상태 초기화
  useFocusEffect(
    useCallback(
      () => () => {
        setStep(MIN_STEP);
        setImage(null);
        setIsAnalyzing(false);
        reset();
        slideAnim.setValue(0);
      },
      [reset, slideAnim],
    ),
  );

  return (
    <>
      <S.Container>
        <DiagnosisStepper step={step} maxStep={MAX_STEP} />
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          }}
        >
          {step === 1 && <StoolImageSelectStep image={image} onChangeImage={setImage} />}
          {step === 2 && <StoolFormStep />}
          {step === 3 && <StoolExtraFormStep />}
        </Animated.View>
      </S.Container>

      <S.Footer>
        <S.NextButton onPress={isSubmit ? handleSubmit : handleNextStep} isSubmit={isSubmit}>
          {isSubmit && <IcDiagnosis color='#fff' />}
          <S.NextButtonText textType='B2' isSubmit={isSubmit}>
            {isSubmit ? '전문 AI 도움받기' : '다음으로'}
          </S.NextButtonText>
        </S.NextButton>
      </S.Footer>

      {isAnalyzing && <LoadingOverlay message='분석 중...' />}
    </>
  );
}
