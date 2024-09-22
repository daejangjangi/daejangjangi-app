import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';

type ButtonProps = {
  text: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  paddingTB?: number;
  paddingLR?: number;
  fontWeight?: number;
  onPress?: () => void;
};

const S = {
  Button: styled(Pressable)<{
    width: number | string;
    height: number | string;
    paddingTB: number;
    paddingLR: number;
    backgroundColor: string;
  }>`
    width: ${({width}) => (typeof width === 'number' ? `${width}px` : width)};
    height: ${({height}) => (typeof height === 'number' ? `${height}px` : height)};
    padding-top: ${({paddingTB}) => `${paddingTB}px`};
    padding-right: ${({paddingLR}) => `${paddingLR}px`};
    padding-bottom: ${({paddingTB}) => `${paddingTB}px`};
    padding-left: ${({paddingLR}) => `${paddingLR}px`};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background-color: ${({backgroundColor}) => backgroundColor};
  `,
  ButtonTxt: styled.Text<{
    color: string;
    fontSize: number;
    fontWeight: number;
  }>`
    color: ${({color}) => color};
    font-size: ${({fontSize}) => `${fontSize}px`};
    font-weight: ${({fontWeight}) => fontWeight};
    font-family: 'Pretendard';
  `,
};

export default function CommonButton({
  text,
  width = '100%',
  height = 80,
  backgroundColor = '#FF286A',
  color = '#ffffff',
  fontSize = 16,
  paddingTB = 10,
  paddingLR = 20,
  fontWeight = 600,
  onPress = () => {},
}: ButtonProps) {
  return (
    <S.Button
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      paddingTB={paddingTB}
      paddingLR={paddingLR}
      onPress={onPress}
    >
      <S.ButtonTxt color={color} fontSize={fontSize} fontWeight={fontWeight}>
        {text}
      </S.ButtonTxt>
    </S.Button>
  );
}
