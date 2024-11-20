import React, {useState} from 'react';
import {StoolColor, StoolMucus, StoolProteinLumps} from '@/src/api/types/care.type';
import {AppText} from '@/src/common/AppComponents';
import {IcCheck} from '@/assets/images/icons';
import StoolFormSlider from '../../components/StoolFormSlider';
import StoolColorPicker from '../../components/StoolColorPicker';
import QuestionSection from './QuestionSection';
import {S} from './StoolFormStepStyles';

export default function StoolFormStep() {
  const [formValue, setFormValue] = useState(4);
  const [selectedColor, setSelectedColor] = useState<StoolColor>(StoolColor.IVORY);
  const [mucus, setMucus] = useState<StoolMucus>(StoolMucus.AMBIGUOUS);
  const [proteinLumps, setProteinLumps] = useState<StoolProteinLumps>(StoolProteinLumps.AMBIGUOUS);
  const [hasBlood, setHasBlood] = useState<boolean | null>(null);
  const [description, setDescription] = useState('');

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
        <S.TitleContainer>
          <S.BlueCheckContainer>
            <IcCheck color='#fff' />
          </S.BlueCheckContainer>
          <S.Title textType='B2Bold'>기저귀 AI가 배변상태를 분석했어요</S.Title>
        </S.TitleContainer>
        <S.SubTitle textType='B1' colorType='textMedium'>
          분석 결과를 확인하고 수정해주세요
        </S.SubTitle>

        <S.FormSection>
          <AppText textType='B1'>변의 묽기를 선택해주세요</AppText>
          <StoolFormSlider value={formValue} onChange={setFormValue} />
        </S.FormSection>

        <S.FormSection>
          <AppText textType='B1'>변의 색상을 선택해주세요</AppText>
          <StoolColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />
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
          value={hasBlood}
          onChange={setHasBlood}
          isSingleRow
        />

        <S.Description>
          <AppText textType='B1'>혈변의 상태를 적어주세요.</AppText>
          <S.TextInput
            multiline
            placeholder='아이의 혈변 상태를 구체적으로 적어주세요.'
            value={description}
            onChangeText={setDescription}
            maxLength={500}
          />
        </S.Description>
      </S.Container>
    </S.ScrollContainer>
  );
}
