import React, {useState, useRef} from 'react';
import {useCardNewsList} from '@/src/hooks/queries/cardnews';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import CardNewsContent from './components/CardNewsContent';
import CardNewsItem from './components/CardNewsItem';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
    padding: 20px;
  `,
};

export default function CardNewsScreen() {
  const {data: cardNewsList} = useCardNewsList();
  const cardnewsItems = cardNewsList?.cardnewsItems || [];
  const [selectedNewsId, setSelectedNewsId] = useState(cardnewsItems?.[0].id);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectNews = (newsId: number) => {
    setSelectedNewsId(newsId);
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  return (
    <S.Container ref={scrollViewRef}>
      <CardNewsContent id={selectedNewsId} />

      {cardnewsItems?.map(item => (
        <CardNewsItem key={item.id} onSelect={handleSelectNews} info={item} />
      ))}
    </S.Container>
  );
}
