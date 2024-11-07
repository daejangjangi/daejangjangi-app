import React, {useState, useRef} from 'react';
import {useCardNewsList} from '@/src/hooks/queries/cardnews';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import CardNewsAccordion from './components/CardNewsAccordion';
import CardNewsContent from './components/CardNewsContent';
import CardNewsItem from './components/CardNewsItem';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
    padding: 20px;
  `,
};

// 임시 데이터
const TEMP_DATA = [
  {
    category: '변비약이 궁금하다면?',
    items: [
      {
        id: 1,
        title: '장염과 식중독의 차이',
        date: '2023.01.23',
        images: [
          'https://placehold.co/350x350',
          'https://placehold.co/350x350',
          'https://placehold.co/350x350',
        ],
      },
      {
        id: 2,
        title: '장건강을 위한 필수 식습관',
        date: '2023.01.22',
        images: ['https://placehold.co/350x350', 'https://placehold.co/350x350'],
      },
    ],
  },
  {
    category: '치질약이 궁금하다면?',
    items: [
      {
        id: 3,
        title: '변비해결법',
        date: '2023.01.21',
        images: ['https://placehold.co/350x350', 'https://placehold.co/350x350'],
      },
    ],
  },
];

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
