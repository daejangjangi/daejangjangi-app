import React from 'react';
import {StoolForm, StoolMucus, StoolProteinLumps} from '@/src/api/types/care.type';
import {AppText} from '@/src/common/AppComponents';
import {IcCheck} from '@/assets/images/icons';
import {useStoolDiagnosisStore} from '@/src/stores/stool-diagnosis.store';
import StoolFormSlider from '../../components/StoolFormSlider';
import StoolColorPicker from '../../components/StoolColorPicker';
import QuestionSection from './QuestionSection';
import {S} from './StoolFormStepStyles';

export default function StoolFormStep() {
  const {
    isAnalyzed,
    form,
    color,
    mucus,
    proteinLumps,
    isBloody,
    bloodyStoolDescription,
    setForm,
    setColor,
    setMucus,
    setProteinLumps,
    setIsBloody,
    setBloodyStoolDescription,
  } = useStoolDiagnosisStore();

  // StoolForm을 숫자로 변환하는 함수
  const convertFormToNumber = (stoolForm: StoolForm) => {
    const formMap = {
      VERY_HARD: 1,
      HARD: 2,
      A_LITTLE_HARD: 3,
      FORMED: 4,
      A_LITTLE_LOOSE: 5,
      LOOSE: 6,
      VERY_LOOSE: 7,
    };
    return formMap[stoolForm] || 4;
  };

  // 숫자를 StoolForm으로 변환하는 함수
  const getFormLabel = (value: number): StoolForm => {
    const reverseFormMap: Record<number, StoolForm> = {
      1: StoolForm.VERY_HARD,
      2: StoolForm.HARD,
      3: StoolForm.A_LITTLE_HARD,
      4: StoolForm.FORMED,
      5: StoolForm.A_LITTLE_LOOSE,
      6: StoolForm.LOOSE,
      7: StoolForm.VERY_LOOSE,
    };
    return reverseFormMap[value] || StoolForm.FORMED;
  };

  const mucusOptions = [
    {value: StoolMucus.NOTHING, label: '없음'},
    {value: StoolMucus.LITTLE, label: '조금 있어요'},
    {value: StoolMucus.LOTS, label: '많아요'},
    {value: StoolMucus.AMBIGUOUS, label: '모르겠어요'},
  ];

  const proteinLumpsOptions = [
    {value: StoolProteinLumps.NOTHING, label: '없음'},
    {value: StoolProteinLumps.LITTLE, label: '조금 있어요'},
    {value: StoolProteinLumps.MANY, label: '많아요'},
    {value: StoolProteinLumps.AMBIGUOUS, label: '모르겠어요'},
  ];

  const bloodOptions = [
    {value: false, label: '아니요'},
    {value: true, label: '네'},
    {value: null, label: '모르겠어요'},
  ];

  return (
    <S.ScrollContainer>
      <S.Container>
        {isAnalyzed && (
          <>
            <S.TitleContainer>
              <S.BlueCheckContainer>
                <IcCheck color='#fff' />
              </S.BlueCheckContainer>
              <S.Title textType='B2Bold'>기저귀 AI가 배변상태를 분석했어요</S.Title>
            </S.TitleContainer>
            <S.SubTitle textType='B1' colorType='textMedium'>
              분석 결과를 확인하고 수정해주세요
            </S.SubTitle>
          </>
        )}

        <S.FormSection>
          <AppText textType='B1'>변의 묽기를 선택해주세요</AppText>
          <StoolFormSlider
            value={convertFormToNumber(form)}
            onChange={value => setForm(getFormLabel(value))}
          />
        </S.FormSection>

        <S.FormSection>
          <AppText textType='B1'>변의 색상을 선택해주세요</AppText>
          <StoolColorPicker selectedColor={color} onColorSelect={setColor} />
        </S.FormSection>

        <QuestionSection
          title='아이의 변에 콧물같은 점액이 섞여있나요?'
          options={mucusOptions}
          value={mucus}
          onChange={setMucus}
        />

        <QuestionSection
          title='아이의 변에 뭉친 흰색 알갱이들이 보이나요?'
          options={proteinLumpsOptions}
          value={proteinLumps}
          onChange={setProteinLumps}
        />

        <QuestionSection
          title='아이가 혈변을 보았나요?'
          options={bloodOptions}
          value={isBloody}
          onChange={setIsBloody}
          isSingleRow
        />

        <S.Description>
          <AppText textType='B1'>혈변의 상태를 적어주세요.</AppText>
          <S.TextInput
            multiline
            placeholder='아이의 혈변 상태를 구체적으로 적어주세요.'
            value={bloodyStoolDescription}
            onChangeText={setBloodyStoolDescription}
            maxLength={500}
          />
        </S.Description>
      </S.Container>
    </S.ScrollContainer>
  );
}
