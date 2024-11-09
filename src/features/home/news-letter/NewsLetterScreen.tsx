import {useNewsLetterList} from '@/src/hooks/queries/news-letter';
import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import NewsLetterListItem from './components/NewsLetterListItem';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px 16px;
    gap: 16px;
  `,
};

export default function NewsLetterScreen() {
  const {data} = useNewsLetterList();
  // const newsletterInfoList = data?.newsletterInfoList ?? [];
  const newsletterInfoList = [
    {
      id: 0,
      title: '그릭요거트',
      subTitle: '그릭요거트 소개',
      description: '그릭요거트 소개',
      profileImage: '',
      category: '유산균',
    },
  ];

  return (
    <S.Container>
      {newsletterInfoList.length === 0 ? (
        <AppText textType='B2'>뉴스레터가 없습니다.</AppText>
      ) : (
        newsletterInfoList.map(item => <NewsLetterListItem key={item.id} item={item} />)
      )}
    </S.Container>
  );
}
