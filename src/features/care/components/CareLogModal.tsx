import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {IcNext} from '@/assets/images/icons';
import {CreateStoolLogDTO, StoolColor, StoolForm} from '@/src/api/types/care.type';
import DatePicker from 'react-native-date-picker';
import {useCreateStoolLog, useUpdateStoolLog, useDeleteStoolLog} from '@/src/hooks/queries/care';
import StoolFormSlider from './StoolFormSlider';
import StoolColorPicker from './StoolColorPicker';
import {Alert} from 'react-native';

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
    flex: 1;
  `,

  TimeSection: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,

  TimeButton: styled.TouchableOpacity`
    padding: 4px 8px;
    background-color: ${props => props.theme.colors.textLight};
    border-radius: 4px;
    margin-left: 8px;
  `,

  ButtonText: styled(AppText)`
    color: #ffffff;
  `,

  ButtonContainer: styled.View`
    flex-direction: row;
    gap: 8px;
  `,

  DeleteButton: styled.TouchableOpacity`
    background-color: ${props => props.theme.colors.textLight};
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    flex: 1;
  `,
};

interface CareLogModalProps {
  isVisible: boolean;
  onClose: () => void;
  isEditing?: boolean;
  initialForm?: number;
  initialColor?: StoolColor;
  logId?: number;
}

const formMapper = {
  1: StoolForm.VERY_HARD,
  2: StoolForm.HARD,
  3: StoolForm.A_LITTLE_HARD,
  4: StoolForm.FORMED,
  5: StoolForm.A_LITTLE_LOOSE,
  6: StoolForm.LOOSE,
  7: StoolForm.VERY_LOOSE,
};

export default function CareLogModal({
  isVisible,
  onClose,
  isEditing = false,
  initialForm,
  initialColor,
  logId,
}: CareLogModalProps) {
  const {mutate: createStoolLog} = useCreateStoolLog();
  const {mutate: updateStoolLog} = useUpdateStoolLog();
  const {mutate: deleteStoolLog} = useDeleteStoolLog();

  const [date, setDate] = useState(new Date());
  const [formValue, setFormValue] = useState(initialForm ?? 4);
  const [selectedColor, setSelectedColor] = useState<StoolColor>(initialColor ?? StoolColor.IVORY);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setFormValue(initialForm ?? 4);
      setSelectedColor(initialColor ?? StoolColor.IVORY);
    }
  }, [isVisible, initialForm, initialColor, logId]);

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

  const formatTime = (selectedDate: Date) => {
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    return `${ampm} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const isDisabled = !formValue || !selectedColor;

  const handleSubmit = () => {
    const dto: CreateStoolLogDTO = {
      form: formMapper[formValue],
      color: selectedColor,
      loggedAt: date.toISOString(),
    };

    if (isEditing && logId) {
      updateStoolLog({id: logId, ...dto});
    } else {
      createStoolLog(dto);
    }

    onClose();
  };

  const handleDelete = () => {
    Alert.alert('삭제하기', '정말로 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          if (logId) {
            deleteStoolLog(logId);
            onClose();
          }
        },
      },
    ]);
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

            <AppText textType='T1'>{formatDate(date)}</AppText>

            <S.DateButton onPress={handleNextDate}>
              <IcNext color='#000' style={{transform: [{rotate: '180deg'}]}} />
            </S.DateButton>
          </S.DateContainer>
        </S.Header>

        <S.TimeSection>
          <AppText textType='B1'>시간을 선택해주세요</AppText>
          <S.TimeButton onPress={() => setOpen(true)}>
            <AppText textType='B1' colorType='text'>
              {formatTime(date)}
            </AppText>
          </S.TimeButton>
        </S.TimeSection>

        <S.Section>
          <AppText textType='B1'>오늘의 대변 형태를 선택해주세요</AppText>
          <S.FormContainer>
            <StoolFormSlider value={formValue} onChange={setFormValue} />
          </S.FormContainer>
        </S.Section>

        <S.Section>
          <AppText textType='B1'>오늘의 대변 색상을 선택해주세요</AppText>
          <StoolColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />
        </S.Section>

        <S.ButtonContainer>
          {isEditing && (
            <S.DeleteButton onPress={handleDelete}>
              <AppText textType='B2Bold' colorType='textMedium'>
                삭제하기
              </AppText>
            </S.DeleteButton>
          )}
          <S.SubmitButton onPress={handleSubmit} disabled={isDisabled} $disabled={isDisabled}>
            <S.ButtonText textType='B2Bold' colorType='text'>
              {isEditing ? '수정하기' : '기록하기'}
            </S.ButtonText>
          </S.SubmitButton>
        </S.ButtonContainer>

        <DatePicker
          modal
          mode='time'
          open={open}
          date={date}
          onConfirm={selectedDate => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </S.Container>
    </Modal>
  );
}
