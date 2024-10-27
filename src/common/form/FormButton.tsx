import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {ActivityIndicator} from 'react-native';

const S = {
  Button: styled.Pressable<{disabled?: boolean}>`
    width: 100%;
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.main};
  `,

  ButtonText: styled(AppText)`
    color: #fff;
  `,
};

interface FormButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function FormButton({title, onPress, disabled, loading}: FormButtonProps) {
  return (
    <S.Button onPress={onPress} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color='#ffffff' />
      ) : (
        <S.ButtonText textType='B2'>{title}</S.ButtonText>
      )}
    </S.Button>
  );
}
