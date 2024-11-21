import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import StoolImagePicker from './StoolImagePicker';

const S = {
  Container: styled.View`
    flex: 1;
  `,

  Title: styled(AppText)`
    margin-top: 48px;
  `,
  SubTitle: styled(AppText)`
    margin-top: 12px;
  `,
  ExtraText: styled(AppText)`
    margin-top: 36px;
    margin-bottom: 24px;
  `,
};

interface StoolImageSelectStepProps {
  image: string | null;
  onChangeImage: (image: string | null) => void;
}

export default function StoolImageSelectStep({image, onChangeImage}: StoolImageSelectStepProps) {
  return (
    <S.Container>
      <S.Title textType='B2Bold'>우선, 아이의 최근 배변 사진을 올려주세요</S.Title>
      <S.SubTitle textType='B1' colorType='textMedium'>
        아장 AI가 배변 상태를 분석해줘요
      </S.SubTitle>
      <S.ExtraText textType='B1'>아이의 변 사진을 추가해주세요</S.ExtraText>
      <StoolImagePicker image={image} onChangeImage={onChangeImage} />
    </S.Container>
  );
}
