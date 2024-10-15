import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {CATEGORIES} from '@/src/common/data/health-concerns';
import SelectBox from '@/src/features/signup/components/SelectBox';
import {useSignUpStore} from '@/src/stores';

const S = {
  Container: styled.View`
    flex: 1;
    gap: 24px;
  `,

  Header: styled.View`
    margin-top: 36px;
    gap: 8px;
  `,

  ScrollViewContainer: styled.ScrollView``,

  Body: styled.View`
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
    padding-bottom: 20px;
  `,
};

export default function SignUpProducts() {
  const {categories, updateCategories} = useSignUpStore(state => state);

  return (
    <S.Container>
      <S.Header>
        <AppText textType='T3' colorType='text'>
          평소 관심있는 장 건강 관련 상품을 선택해주세요
        </AppText>
        <AppText textType='B2' colorType='textMedium'>
          (여러개 선택할 수 있어요)
        </AppText>
      </S.Header>

      <S.ScrollViewContainer>
        <S.Body>
          {CATEGORIES.map(c => (
            <SelectBox
              key={c}
              label={c}
              selected={categories.includes(c)}
              onPress={() => updateCategories(c)}
            />
          ))}
        </S.Body>
      </S.ScrollViewContainer>
    </S.Container>
  );
}
