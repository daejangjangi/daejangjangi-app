import React, {useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import Birthday from '@/src/features/signup/components/Birthday';
import {useUpdateMemberInfo, useMemberInfo} from '@/src/hooks/queries/member';
import {Alert} from 'react-native';

const S = {
  Container: styled.View`
    padding: 16px 20px;
    background-color: #fff;
    border-radius: 12px;
  `,
  BirthdayContainer: styled.View`
    margin-top: 20px;
  `,
  Footer: styled.View`
    margin-top: 20px;
    flex-direction: row;
    gap: 8px;
  `,
  Button: styled.Pressable<{$sub?: boolean}>`
    flex: 1;
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${props =>
      props.$sub ? props.theme.colors.textLight : props.theme.colors.main};
  `,
  ButtonText: styled(AppText)<{$sub?: boolean}>`
    color: ${props => (props.$sub ? props.theme.colors.textMedium : '#fff')};
  `,
};

interface EditBirthdayModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentBirthday: string;
}

export default function EditBirthdayModal({
  isVisible,
  onClose,
  currentBirthday,
}: EditBirthdayModalProps) {
  const {data: memberInfo} = useMemberInfo();
  const {mutate: updateMemberInfo} = useUpdateMemberInfo();
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    currentBirthday ? new Date(currentBirthday) : null,
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (!memberInfo || !selectedDate) return;

    const formattedDate = selectedDate.toISOString().split('T')[0];

    updateMemberInfo(
      {
        ...memberInfo,
        birth: formattedDate,
      },
      {
        onSuccess: () => {
          onClose();
          Alert.alert('알림', '생년월일이 변경되었습니다.');
        },
        onError: (error: any) => {
          console.error('생년월일 변경 실패', error);
          Alert.alert('오류', '생년월일 변경에 실패했습니다.');
        },
      },
    );
  };

  const defaultDate = currentBirthday ? new Date(currentBirthday) : undefined;

  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <AppText textType='B2'>생년월일</AppText>

        <S.BirthdayContainer>
          <Birthday defaultDate={defaultDate} onChangeDate={handleDateChange} />
        </S.BirthdayContainer>

        <S.Footer>
          <S.Button $sub onPress={onClose}>
            <S.ButtonText $sub textType='B2'>
              취소
            </S.ButtonText>
          </S.Button>
          <S.Button onPress={handleSubmit}>
            <S.ButtonText textType='B2'>저장</S.ButtonText>
          </S.Button>
        </S.Footer>
      </S.Container>
    </Modal>
  );
}
