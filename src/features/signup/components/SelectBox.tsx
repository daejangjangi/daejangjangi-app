import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Box: styled(Pressable)<{$selected?: boolean}>`
    border-radius: 40px;
    padding: 16px 64px;
    justify-content: center;
    align-items: center;

    background-color: ${props => (props.$selected ? '#ffe7ee' : props.theme.colors.textLight)};
    min-width: 168px;
  `,
};

interface SelectBoxProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function SelectBox({selected, onPress, label}: SelectBoxProps) {
  return (
    <S.Box $selected={selected} onPress={onPress}>
      <AppText textType='B3' colorType='text'>
        {label}
      </AppText>
    </S.Box>
  );
}
