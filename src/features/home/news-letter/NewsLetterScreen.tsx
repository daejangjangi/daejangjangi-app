import React from 'react';
import {useNewsLetterList} from '@/src/hooks/queries/news-letter';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {FlatList} from 'react-native';
import NewsLetterListItem from './components/NewsLetterListItem';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px 16px;
  `,
};

export default function NewsLetterScreen() {
  const {data} = useNewsLetterList();
  const newsletterInfoList = data?.newsletterInfoList ?? [];

  return (
    <S.Container>
      {newsletterInfoList.length === 0 ? (
        <AppText textType='B2'>뉴스레터가 없습니다.</AppText>
      ) : (
        <FlatList
          data={newsletterInfoList}
          renderItem={({item}) => <NewsLetterListItem item={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{gap: 16}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </S.Container>
  );
}
