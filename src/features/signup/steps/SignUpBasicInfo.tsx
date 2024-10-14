import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import SelectBox from '@/src/features/signup/components/SelectBox';
import {useSignUpStore} from '@/src/stores';
import Birthday from '@/src/features/signup/components/Birthday';

const S = {
  Container: styled.View`
    flex: 1;
    margin-top: 50px;
    gap: 56px;
  `,

  Section: styled.View``,

  SectionHeader: styled.View`
    gap: 8px;
  `,

  SelectGroups: styled.View`
    margin-top: 28px;
    flex-direction: row;
    justify-content: space-between;
  `,

  BirthdaySection: styled.View`
    margin-top: 32px;
  `,
};

export default function SignUpBasicInfo() {
  const {nickname, basicInfo, updateGender} = useSignUpStore(state => state);

  return (
    <S.Container>
      <S.Section>
        <S.SectionHeader>
          <AppText textType='T3' colorType='text'>
            {nickname} 님의 성별을 알려주세요.
          </AppText>
          <AppText textType='B2' colorType='textMedium'>
            {nickname} 님의 성별에 딱맞는 상품을 추천해드릴게요.
          </AppText>
        </S.SectionHeader>

        <S.SelectGroups>
          <SelectBox
            label='남성'
            selected={basicInfo.gender === 'MALE'}
            onPress={() => updateGender('MALE')}
          />
          <SelectBox
            label='여성'
            selected={basicInfo.gender === 'FEMALE'}
            onPress={() => updateGender('FEMALE')}
          />
        </S.SelectGroups>
      </S.Section>

      <S.Section>
        <S.SectionHeader>
          <AppText textType='T3' colorType='text'>
            {nickname} 님의 생년월일을 알려주세요.
          </AppText>
          <AppText textType='B2' colorType='textMedium'>
            {nickname} 님의 나이대에에 딱맞는 상품을 추천해드릴게요.
          </AppText>
        </S.SectionHeader>

        <S.BirthdaySection>
          <Birthday year={2024} />
        </S.BirthdaySection>
      </S.Section>
    </S.Container>
  );
}
