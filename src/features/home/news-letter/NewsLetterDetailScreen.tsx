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

  NewsLetterTitle: styled.Text`
    font-size: 24px;
    font-family: NanumSquareNeo-ExtraBold;

    width: 70%;
    color: rgb(252, 95, 58);
    padding-bottom: 12px;
    border-bottom-width: 2px;
    border-bottom-color: rgb(252, 95, 58);
    margin-bottom: 20px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
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
        <S.NewsLetterTitle>대장장이 MD 뉴스레터</S.NewsLetterTitle>

        <S.Header>
          <S.Title>
            <AppText textType='T1'>{data?.title}</AppText>
            <AppText textType='B1' colorType='textMedium'>
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
