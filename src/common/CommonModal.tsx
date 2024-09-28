import React from 'react';
import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import {AppText} from '@/src/common/AppComponents';
import {theme} from '@/src/styles/theme';

type ModalProps = {
  subject: string;
  children: React.ReactNode;
  buttonProps: {
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
};

const S = {
  ModalContainer: styled.View`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 32px;
    padding-bottom: 32px;
    border-radius: 12px;
    border: none;
    gap: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    background-color: white;
  `,
  Subject: styled(AppText)`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 700;
  `,
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
  ButtonTxt: styled(AppText)<{
    color: string;
    fontSize: number;
    fontWeight: number;
  }>`
    color: ${({color}) => color};
    font-size: ${({fontSize}) => `${fontSize}px`};
    font-weight: ${({fontWeight}) => fontWeight};
  `,
};

export default function CommonModal({subject, children, buttonProps}: ModalProps) {
  // buttonProps에서 필요한 값들을 추출
  const {
    text,
    width = '100%',
    height = 80,
    backgroundColor = theme.colors.main,
    color = '#ffffff',
    fontSize = 16,
    paddingTB = 10,
    paddingLR = 20,
    fontWeight = 600,
    onPress = () => {},
  } = buttonProps;

  return (
    <S.ModalContainer>
      <S.Subject>{subject}</S.Subject>
      {children}
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
    </S.ModalContainer>
  );
}
