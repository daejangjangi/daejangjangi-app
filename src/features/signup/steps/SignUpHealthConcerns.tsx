import React, {useEffect} from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {DISEASES} from '@/src/common/data/health-concerns';
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

export default function SignUpHealthConcerns() {
  const {diseases, updateDiseases, updateCanGoNext} = useSignUpStore(state => state);

  useEffect(() => {
    const canGoNext = diseases.length > 0;
    updateCanGoNext(4, canGoNext);
  }, [diseases, updateCanGoNext]);

  return (
    <S.Container>
      <S.Header>
        <AppText textType='T3' colorType='text'>
          평소 고민인 장 건강 관련 질환을 선택해주세요.
        </AppText>
        <AppText textType='B2' colorType='textMedium'>
          (여러개 선택할 수 있어요)
        </AppText>
      </S.Header>

      <S.ScrollViewContainer>
        <S.Body>
          {DISEASES.map(d => (
            <SelectBox
              key={d}
              label={d}
              selected={diseases.includes(d)}
              onPress={() => updateDiseases(d)}
            />
          ))}
        </S.Body>
      </S.ScrollViewContainer>
    </S.Container>
  );
}
