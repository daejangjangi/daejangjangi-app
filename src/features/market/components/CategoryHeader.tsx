import React from 'react';
import {
  IcCookie,
  IcDaejangjangi,
  IcGrain,
  IcGreenHeart,
  IcProbiotics,
  IcYellowSmile,
} from '@/assets/images/icons';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {ProductCategories} from '@/src/api/types/product.type';
import {useRouter} from 'expo-router';

const S = {
  Container: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;
  `,

  Item: styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,

  ItemText: styled(AppText)`
    font-size: 13px;
  `,
};

interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

function CategoryItem({icon, label, onPress}: CategoryItemProps) {
  return (
    <S.Item onPress={onPress}>
      {icon}
      <S.ItemText textType='B2Bold'>{label}</S.ItemText>
    </S.Item>
  );
}

export default function CategoryHeader() {
  const router = useRouter();

  const goToCategory = (category: ProductCategories) => {
    router.push({
      pathname: '/(tabs)/market/categories',
      params: {category},
    });
  };

  return (
    <S.Container>
      <CategoryItem
        icon={<IcDaejangjangi width={32} height={32} />}
        label='인기상품'
        onPress={() => goToCategory(ProductCategories.POPULAR)}
      />
      <CategoryItem
        icon={<IcProbiotics width={32} height={32} />}
        label='유산균'
        onPress={() => goToCategory(ProductCategories.PROBIOTICS)}
      />
      <CategoryItem
        icon={<IcYellowSmile width={32} height={32} />}
        label='저포드맵'
        onPress={() => goToCategory(ProductCategories.LOW_FODMAP)}
      />
      <CategoryItem
        icon={<IcGreenHeart width={32} height={32} />}
        label='생활/리빙'
        onPress={() => goToCategory(ProductCategories.LIVING)}
      />
      <CategoryItem
        icon={<IcGrain width={32} height={32} />}
        label='식이섬유'
        onPress={() => goToCategory(ProductCategories.DIETARY_FIBER)}
      />
      <CategoryItem
        icon={<IcCookie width={32} height={32} />}
        label='간식'
        onPress={() => goToCategory(ProductCategories.SNACKS)}
      />
    </S.Container>
  );
}
