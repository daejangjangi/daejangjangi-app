import React, {useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {IcNext} from '@/assets/images/icons';
import {View} from 'react-native';
import StoolFormSlider from './StoolFormSlider';

const S = {
  Container: styled.View`
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    margin: 20px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,

  DateContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
  `,

  DateButton: styled.TouchableOpacity`
    padding: 4px;
  `,

  Section: styled.View`
    gap: 12px;
    margin-bottom: 20px;
  `,

  FormContainer: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  `,

  ColorContainer: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  `,

  SubmitButton: styled.TouchableOpacity`
    background-color: #f0f0f0;
    padding: 16px;
    border-radius: 8px;
    align-items: center;
  `,
};

interface CareLogModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CareLogModal({isVisible, onClose}: CareLogModalProps) {
  const [date, setDate] = useState(new Date());
  const [formValue, setFormValue] = useState(3); // 1~5 사이의 값

  const handlePrevDate = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  const formatDate = (selectedDate: Date) =>
    selectedDate
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .slice(0, -1);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      style={{margin: 0}}
    >
      <S.Container>
        <S.Header>
          <S.DateContainer>
            <S.DateButton onPress={handlePrevDate}>
              <IcNext color='#000' />
            </S.DateButton>

            <AppText textType='T1'>{formatDate(date)} 배변일지</AppText>

            <S.DateButton onPress={handleNextDate}>
              <IcNext color='#000' style={{transform: [{rotate: '180deg'}]}} />
            </S.DateButton>
          </S.DateContainer>
        </S.Header>

        <S.Section>
          <AppText textType='B1'>오늘의 대변 형태를 선택해주세요</AppText>
          <S.FormContainer>
            <StoolFormSlider value={formValue} onChange={setFormValue} />
          </S.FormContainer>
        </S.Section>

        <S.Section>
          <AppText textType='B1'>오늘의 대변 색상을 선택해주세요</AppText>
          <S.ColorContainer>{/* @TODO: 대변 색상 선택 UI 구현 */}</S.ColorContainer>
        </S.Section>

        <S.SubmitButton onPress={onClose}>
          <AppText textType='B2'>기록하기</AppText>
        </S.SubmitButton>
      </S.Container>
    </Modal>
  );
}
