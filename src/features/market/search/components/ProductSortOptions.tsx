import React from 'react';
import styled from 'styled-components/native';
import {ProductSortKey} from '@/src/api/types/product.type';

const S = {
  Container: styled.View`
    flex-direction: row;
    gap: 8px;
  `,

  SortOption: styled.TouchableOpacity<{isSelected: boolean}>`
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.colors.textLight};
    border-radius: 20px;
    background-color: ${props => (props.isSelected ? props.theme.colors.text : '#fff')};
    justify-content: center;
    align-items: center;
  `,

  SortOptionText: styled.Text<{isSelected: boolean}>`
    color: ${props => (props.isSelected ? '#fff' : props.theme.colors.text)};
    line-height: 18px;
  `,
};

interface ProductSortOptionsProps {
  sortKey: ProductSortKey;
  onSelectSortKey: (sortKey: ProductSortKey) => void;
}

export default function ProductSortOptions({sortKey, onSelectSortKey}: ProductSortOptionsProps) {
  const handleSelectSortOption = (option: ProductSortKey) => {
    onSelectSortKey(option);
  };

  return (
    <S.Container>
      <S.SortOption
        isSelected={sortKey === ProductSortKey.POPULAR}
        onPress={() => handleSelectSortOption(ProductSortKey.POPULAR)}
      >
        <S.SortOptionText isSelected={sortKey === ProductSortKey.POPULAR}>
          {ProductSortKey.POPULAR}
        </S.SortOptionText>
      </S.SortOption>
      <S.SortOption
        isSelected={sortKey === ProductSortKey.LOW_PRICE}
        onPress={() => handleSelectSortOption(ProductSortKey.LOW_PRICE)}
      >
        <S.SortOptionText isSelected={sortKey === ProductSortKey.LOW_PRICE}>
          {ProductSortKey.LOW_PRICE}
        </S.SortOptionText>
      </S.SortOption>
    </S.Container>
  );
}
