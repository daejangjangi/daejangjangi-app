import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';

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

const MEAL_TYPES = ['이유식', '모유', '분유', '기타'];

export default function StoolExtraFormStep() {
  const [description, setDescription] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('이유식');

  return (
    <S.Container>
      <S.Title textType='B2Bold'>아이의 추가적인 증상을 적어주세요</S.Title>

      <S.Label textType='B2'>추가 증상을 적어주세요</S.Label>
      <S.TextArea
        placeholder='아이의 배변 상태 이외의 추가적인 증상을 적어주세요.

예시)'
        multiline
        value={description}
        onChangeText={setDescription}
        maxLength={500}
        textAlignVertical='top'
      />

      <S.Label textType='B2'>오늘 먹은 음식을 적어주세요</S.Label>
      <S.MealTypeContainer>
        {MEAL_TYPES.map(type => (
          <S.MealTypeButton
            key={type}
            isSelected={selectedMealType === type}
            onPress={() => setSelectedMealType(type)}
          >
            <S.MealTypeText textType='B2' isSelected={selectedMealType === type}>
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
      />
    </S.Container>
  );
}
