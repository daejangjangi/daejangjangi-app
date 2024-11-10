import React from 'react';
import {useLocalSearchParams} from 'expo-router';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {useNewsLetterDetail} from '@/src/hooks/queries/news-letter';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
  `,

  ContentContainer: styled.View`
    padding: 20px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
  `,

  Title: styled.View`
    gap: 20px;
    width: 60%;
  `,

  ProfileImage: styled(Image)`
    width: 40%;
    aspect-ratio: 1;
  `,
};

export default function NewsLetterDetailScreen() {
  const {id} = useLocalSearchParams();
  const {data} = useNewsLetterDetail(Number(id));

  return (
    <S.Container>
      <S.ContentContainer>
        <S.Header>
          <S.Title>
            <AppText textType='T3'>{data?.title}</AppText>
            <AppText textType='B2' colorType='textMedium'>
              {data?.subTitle}
            </AppText>
          </S.Title>

          <S.ProfileImage source={data?.profileImage} />
        </S.Header>

        <AppText textType='B1'>{data?.description}</AppText>
      </S.ContentContainer>
    </S.Container>
  );
}
