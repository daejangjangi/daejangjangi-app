import React, {useState, useRef, useEffect, useMemo} from 'react';
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

  CardNewsList: styled.View`
    margin-bottom: 20px;
  `,
};

export default function CardNewsScreen() {
  const {data: cardNewsList} = useCardNewsList();
  const cardnewsItems = useMemo(() => cardNewsList?.cardnewsItems || [], [cardNewsList]);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectNews = (newsId: number) => {
    setSelectedNewsId(newsId);
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  useEffect(() => {
    if (cardnewsItems.length > 0) {
      setSelectedNewsId(cardnewsItems[cardnewsItems.length - 1].id);
    }
  }, [cardnewsItems]);

  return (
    <S.Container ref={scrollViewRef}>
      {selectedNewsId && <CardNewsContent id={selectedNewsId} />}

      <S.CardNewsList>
        {cardnewsItems?.map(item => (
          <CardNewsItem key={item.id} onSelect={handleSelectNews} info={item} />
        ))}
      </S.CardNewsList>
    </S.Container>
  );
}
