import React from 'react';
import styled from 'styled-components/native';
import CommonButton from './CommonButton';

type ModalProps = {
  subject: string;
  children: React.ReactNode;
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
  Subject: styled.Text`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 700;
  `,
};
export default function CommonModal({subject, children}: ModalProps) {
  return (
    <S.ModalContainer>
      <S.Subject>{subject}</S.Subject>
      {children}
      <CommonButton
        text='저장'
        widthprops={200}
        heightprops={60}
        backgroundcolor='#FF286A'
        colorprops='#FFFFF'
        fontSizeprops={19}
        fontWeightprops={500}
        paddingTB={16}
        paddingLR={64}
      />
    </S.ModalContainer>
  );
}
