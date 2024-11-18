import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {IcNext} from '@/assets/images/icons';
import {StoolColor} from '@/src/api/types/care.type';
import StoolFormSlider from './StoolFormSlider';
import StoolColorPicker from './StoolColorPicker';

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

  SubmitButton: styled.TouchableOpacity<{$disabled: boolean}>`
    background-color: ${props =>
      props.$disabled ? props.theme.colors.textLight : props.theme.colors.main};
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    opacity: ${props => (props.$disabled ? 0.5 : 1)};
  `,

  ButtonText: styled(AppText)`
    color: #ffffff;
  `,
};

interface CareLogModalProps {
  isVisible: boolean;
  onClose: () => void;
  isEditing?: boolean;
  initialForm?: number;
  initialColor?: StoolColor;
}

export default function CareLogModal({
  isVisible,
  onClose,
  isEditing = false,
  initialForm,
  initialColor,
}: CareLogModalProps) {
  const [date, setDate] = useState(new Date());
  const [formValue, setFormValue] = useState(initialForm ?? 4);
  const [selectedColor, setSelectedColor] = useState<StoolColor>(initialColor ?? StoolColor.IVORY);

  useEffect(() => {
    if (isVisible) {
      setFormValue(initialForm ?? 4);
      setSelectedColor(initialColor ?? StoolColor.IVORY);
    }
  }, [isVisible, initialForm, initialColor]);

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

  const isDisabled = !formValue || !selectedColor;

  const handleSubmit = () => {
    setFormValue(4);
    setSelectedColor(StoolColor.IVORY);
    onClose();
  };

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

        <StoolColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />

        <S.SubmitButton onPress={handleSubmit} disabled={isDisabled} $disabled={isDisabled}>
          <S.ButtonText textType='B2Bold'>{isEditing ? '수정하기' : '기록하기'}</S.ButtonText>
        </S.SubmitButton>
      </S.Container>
    </Modal>
  );
}
