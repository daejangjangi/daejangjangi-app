import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import HomeBannerItem from '@/src/features/home/main/components/HomeBannerItem';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import {Dimensions} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import HomeBannerNavigation from '@/src/features/home/main/components/HomeBannerNavigation';
import {useRecommendProducts} from '@/src/hooks/queries/product';

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

export default function HomeBanner() {
  const {data} = useRecommendProducts();
  const products = data?.recommendedProducts || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const {width} = Dimensions.get('window');

  const handleProgressChange = (progressValue: number) => {
    let index = Math.round(progressValue);

    if (index > products.length - 1) {
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
          data={products}
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
              name={products[index].name}
              description={products[index].comment}
              imageUrl={products[index].profile}
              saleLink={products[index].saleLink}
            />
          )}
        />
      </S.BannerItemsContainer>

      <HomeBannerNavigation currPage={currentIndex} maxPage={products.length - 1} />
    </S.Container>
  );
}
