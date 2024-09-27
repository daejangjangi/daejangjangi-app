import React from 'react';
import {TextProps} from 'react-native';
import {FontsTypes} from '@/src/styles/theme';
import styled from 'styled-components/native';

interface CustomTextProps {
  // eslint-disable-next-line react/require-default-props
  textType?: keyof FontsTypes;
}

const S = {
  CustomText: styled.Text<CustomTextProps>`
    font-family: 'PretendardVariable';
    ${props => (props.textType ? props.theme.fonts[props.textType] : '')};
  `,

  CustomTextInput: styled.TextInput`
    font-family: 'PretendardVariable';
    ${props => (props.textType ? props.theme.fonts[props.textType] : '')};
  `,
};

// eslint-disable-next-line react/function-component-definition
export const AppText: React.FC<TextProps & CustomTextProps> = props => (
  // eslint-disable-next-line react/destructuring-assignment,react/jsx-props-no-spreading
  <S.CustomText {...props}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </S.CustomText>
);

// eslint-disable-next-line react/function-component-definition
export const AppTextInput: React.FC<TextProps & CustomTextProps> = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading,react/destructuring-assignment
  <S.CustomTextInput {...props} />
);
