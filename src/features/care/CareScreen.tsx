import React, {useState} from 'react';

import styled from 'styled-components/native';
import {IcPlusWhite} from '@/assets/images/icons';
import CareProfile from './components/CareProfile';
import CareCalendars from './components/CareCalendars';
import TodayLogs from './components/TodayLogs';
import CareActionModal from './components/CareActionModal';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #f6f5f4;
  `,
  Content: styled.View`
    padding: 20px;
    gap: 8px;
  `,

  Button: styled.Pressable`
    position: absolute;
    bottom: 20px;
    right: 20px;

    background-color: ${props => props.theme.colors.main};
    width: 46px;
    height: 46px;
    border-radius: 23px;
    align-items: center;
    justify-content: center;
  `,
};

export default function CareScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressButton = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <S.Container>
        <S.Content>
          <CareProfile />
          <CareCalendars />
          <TodayLogs />
        </S.Content>
      </S.Container>

      <S.Button onPress={handlePressButton}>
        <IcPlusWhite />
      </S.Button>

      <CareActionModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </>
  );
}
