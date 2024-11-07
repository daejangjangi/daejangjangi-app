import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import Carousel from 'react-native-reanimated-carousel';
import {Image} from 'expo-image';
import {useCardNewsDetail} from '@/src/hooks/queries/cardnews';
import {format} from 'date-fns';

const S = {
  Container: styled.View`
    gap: 12px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  `,

  Date: styled(AppText)`
    color: ${props => props.theme.colors.textMedium};
  `,

  ImageContainer: styled.View`
    height: 350px;
    border-radius: 12px;
  `,

  CarouselImage: styled(Image)`
    width: 100%;
    height: 100%;
    border-radius: 12px;
  `,

  Pagination: styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 8px;
  `,

  PaginationDot: styled.View<{$isActive: boolean}>`
    width: ${props => (props.$isActive ? '20px' : '6px')};
    height: 6px;
    border-radius: 3px;
    background-color: ${props =>
      props.$isActive ? props.theme.colors.main : props.theme.colors.textLight};
  `,
};

interface CardNewsItemProps {
  id: number;
}

export default function CardNewsContent({id}: CardNewsItemProps) {
  const {data: cardNews} = useCardNewsDetail(id);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [id]);

  return (
    <S.Container>
      <S.Header>
        <AppText textType='B2Bold'>{cardNews?.title}</AppText>
        <S.Date textType='C1'>
          {format(new Date(cardNews?.createdAt ?? new Date()), 'yyyy.MM.dd')}
        </S.Date>
      </S.Header>

      <S.ImageContainer>
        <Carousel
          key={id}
          width={350}
          height={350}
          data={cardNews?.newsImages || []}
          onProgressChange={(_, absoluteProgress) => {
            setActiveIndex(Math.round(absoluteProgress));
          }}
          renderItem={({item}) => <S.CarouselImage source={item} contentFit='cover' />}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 20,
          }}
        />
      </S.ImageContainer>

      <S.Pagination>
        {cardNews?.newsImages?.map((_, index) => (
          <S.PaginationDot key={_} $isActive={index === activeIndex} />
        ))}
      </S.Pagination>
    </S.Container>
  );
}
