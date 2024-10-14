import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Button: styled.Pressable`
    border-radius: 8px;
    padding: 20px 0;
    justify-content: center;
    align-items: center;

    width: 100%;
    background-color: ${props => props.theme.colors.main};
  `,

  Text: styled(AppText)`
    color: #fff;
  `,
};

interface FormButtonProps {
  title: string;
  onPress: (...args: never[]) => void;
}

export default function FormButton({title, onPress}: FormButtonProps) {
  return (
    <S.Button onPress={onPress}>
      <S.Text textType='B2'>{title}</S.Text>
    </S.Button>
  );
}
