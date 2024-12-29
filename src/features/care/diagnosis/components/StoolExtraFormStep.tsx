import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useStoolDiagnosisStore} from '@/src/stores/stool-diagnosis.store';
import {DietType} from '@/src/api/types/care.type';

const S = {
  Container: styled.View`
    flex: 1;
  `,

  Title: styled(AppText)`
    margin-top: 20px;
    margin-bottom: 20px;
  `,

  TextArea: styled.TextInput`
    height: 120px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.textLight};
    margin-bottom: 24px;
  `,

  Label: styled(AppText)`
    margin-bottom: 12px;
  `,

  MealTypeContainer: styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
  `,

  MealTypeButton: styled.TouchableOpacity<{isSelected: boolean}>`
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${props => (props.isSelected ? '#FF4B77' : '#F2F4F6')};
  `,

  MealTypeText: styled(AppText)<{isSelected: boolean}>`
    color: ${props => (props.isSelected ? '#FFFFFF' : '#8C919C')};
  `,
};

const MEAL_TYPE_MAPPING = {
  이유식: DietType.SOLID_FOOD,
  모유: DietType.BREAST_MILK,
  분유: DietType.POWDERED_MILK,
} as const;

const MEAL_TYPES = Object.keys(MEAL_TYPE_MAPPING);

export default function StoolExtraFormStep() {
  const {
    additionalDescription,
    dietType,
    dietDescription,
    setAdditionalDescription,
    setDietType,
    setDietDescription,
  } = useStoolDiagnosisStore();

  // DietType을 한글로 변환하는 함수
  const getDietTypeLabel = (type: DietType) => {
    const reverseMealTypeMapping = Object.entries(MEAL_TYPE_MAPPING).reduce(
      (acc, [key, value]) => ({...acc, [value]: key}),
      {} as Record<DietType, string>,
    );
    return reverseMealTypeMapping[type] || '기타';
  };

  return (
    <S.Container>
      <S.Title textType='B2Bold'>아이의 추가적인 증상을 적어주세요</S.Title>

      <S.Label textType='B2'>추가 증상을 적어주세요</S.Label>
      <S.TextArea
        placeholder='아이의 배변 상태 이외의 추가적인 증상을 적어주세요.

예시)'
        multiline
        value={additionalDescription}
        onChangeText={setAdditionalDescription}
        maxLength={500}
        textAlignVertical='top'
      />

      <S.Label textType='B2'>오늘 먹은 음식을 적어주세요</S.Label>
      <S.MealTypeContainer>
        {MEAL_TYPES.map(type => (
          <S.MealTypeButton
            key={type}
            isSelected={getDietTypeLabel(dietType) === type}
            onPress={() => setDietType(MEAL_TYPE_MAPPING[type as keyof typeof MEAL_TYPE_MAPPING])}
          >
            <S.MealTypeText textType='B2' isSelected={getDietTypeLabel(dietType) === type}>
              {type}
            </S.MealTypeText>
          </S.MealTypeButton>
        ))}
      </S.MealTypeContainer>

      <S.TextArea
        placeholder={`오늘 아이가 먹은 음식에 대해 자세하게 적어주세요.

예시) 한시간 쯤 불린 현미밥에 닭고기 얹어서 먹었어요.`}
        multiline
        textAlignVertical='top'
        maxLength={500}
        value={dietDescription}
        onChangeText={setDietDescription}
      />
    </S.Container>
  );
}
