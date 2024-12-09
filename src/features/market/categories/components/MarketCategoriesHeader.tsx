import React from 'react';
import styled from 'styled-components/native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import {ProductCategories} from '@/src/api/types/product.type';

const S = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    background-color: #fff;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  CategoryButton: styled.Pressable<{$isSelected: boolean}>`
    padding: 12px 8px;
    border-bottom-width: ${({$isSelected}) => ($isSelected ? 2 : 0)}px;
    border-bottom-color: ${({$isSelected, theme}) =>
      $isSelected ? theme.colors.text : 'transparent'};
  `,

  CategoryText: styled(AppText)<{$isSelected: boolean}>`
    color: ${({$isSelected, theme}) => ($isSelected ? theme.colors.text : theme.colors.textMedium)};
  `,

  ScrollView: styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
  })``,

  Categories: styled.View`
    flex-direction: row;
    gap: 8px;
    padding-right: 20px;
  `,
};

const CATEGORIES = [
  {label: '인기상품', value: ProductCategories.POPULAR},
  {label: '유산균', value: ProductCategories.PROBIOTICS},
  {label: '저포드맵', value: ProductCategories.LOW_FODMAP},
  {label: '생활/리빙', value: ProductCategories.LIVING},
  {label: '식이섬유', value: ProductCategories.DIETARY_FIBER},
  {label: '간식', value: ProductCategories.SNACKS},
];

export default function MarketCategoriesHeader() {
  const router = useRouter();
  const {category} = useLocalSearchParams<{category: ProductCategories}>();

  const handleCategoryPress = (selectedCategory: ProductCategories) => {
    router.setParams({category: selectedCategory});
  };

  return (
    <S.Container>
      <S.ScrollView>
        <S.Categories>
          {CATEGORIES.map(({label, value}) => (
            <S.CategoryButton
              key={value}
              $isSelected={category === value}
              onPress={() => handleCategoryPress(value)}
            >
              <S.CategoryText textType='B1' $isSelected={category === value}>
                {label}
              </S.CategoryText>
            </S.CategoryButton>
          ))}
        </S.Categories>
      </S.ScrollView>
    </S.Container>
  );
}
