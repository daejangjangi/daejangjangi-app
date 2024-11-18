import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {useRouter} from 'expo-router';
import {IcWandGray, IcWandMain} from '@/assets/images/icons';

const S = {
  Container: styled.View`
    position: absolute;
    bottom: 160px;
    right: 20px;
    background-color: white;
    border-radius: 8px;
    padding: 4px;
  `,

  Button: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
  `,
};

interface CareActionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CareActionModal({isVisible, onClose}: CareActionModalProps) {
  const router = useRouter();

  const handlePressDiagnosis = () => {
    router.push('/care/diagnosis');
    onClose();
  };

  const handlePressLog = () => {
    // @TODO: 배변기록 작성 페이지로 이동
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
        <S.Button onPress={handlePressLog}>
          <IcWandGray />
          <AppText textType='B1'>배변기록 추가</AppText>
        </S.Button>
        <S.Button onPress={handlePressDiagnosis}>
          <IcWandMain />
          <AppText textType='B1'>배변 AI 분석</AppText>
        </S.Button>
      </S.Container>
    </Modal>
  );
}
