import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcArrowRightS} from '@/assets/images/icons';

const S = {
  Container: styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  Info: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
  `,
};

interface MenuItemProps {
  Icon: ReactNode;
  title: string;
  onPress: () => void;
}

export default function MyPageMenuItem({Icon, title, onPress}: MenuItemProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Info>
        {Icon}
        <AppText textType='B1'>{title}</AppText>
      </S.Info>

      <IcArrowRightS />
    </S.Container>
  );
}
