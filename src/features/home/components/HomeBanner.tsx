import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import HomeBannerItem from '@/src/features/home/components/HomeBannerItem';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import {Dimensions} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import HomeBannerNavigation from '@/src/features/home/components/HomeBannerNavigation';

const S = {
  Container: styled.View`
    padding: 18px 0;
    gap: 16px;
  `,

  BannerItemsContainer: styled.View`
    height: 150px;
  `,

  BannerItems: styled(Carousel)`
    position: relative;
    width: 100%;
    height: 100%;
  `,

  BannerTitle: styled(AppText)`
    padding: 0 20px;
    font-family: Pretendard-Medium;
    font-size: 22px;
  `,
};

const TEMP_DATA = [
  {
    id: 1,
    title: '저지방 유산균',
    description: '다이어트로 인한 변비에\n저지방 유산균이 필요한 이유',
    imageUrl: 'https://placehold.co/200',
  },
  {
    id: 2,
    title: '저지방 유산균',
    description: '다이어트로 인한 변비에\n저지방 유산균이 필요한 이유',
    imageUrl: 'https://placehold.co/200',
  },
  {
    id: 3,
    title: '저지방 유산균',
    description: '다이어트로 인한 변비에\n저지방 유산균이 필요한 이유',
    imageUrl: 'https://placehold.co/200',
  },
];

export default function HomeBanner() {
  // @Todo: 실제 추천 아이템 불러오기 구현
  const [items, setItems] = useState(TEMP_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {width} = Dimensions.get('window');

  const handleProgressChange = (progressValue: number) => {
    let index = Math.round(progressValue);

    if (index > items.length - 1) {
      index = 0;
    }

    setCurrentIndex(index);
  };

  return (
    <S.Container>
      <S.BannerTitle>내 장건강을 위해 필요한 것들.</S.BannerTitle>

      <S.BannerItemsContainer>
        <S.BannerItems
          width={width}
          height={152}
          data={items}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={(_, absoluteProgress) => {
            runOnJS(handleProgressChange)(absoluteProgress);
          }}
          renderItem={({index}) => (
            <HomeBannerItem
              name={items[index].title}
              description={items[index].description}
              imageUrl={items[index].imageUrl}
            />
          )}
        />
      </S.BannerItemsContainer>

      <HomeBannerNavigation currPage={currentIndex} maxPage={items.length - 1} />
    </S.Container>
  );
}
