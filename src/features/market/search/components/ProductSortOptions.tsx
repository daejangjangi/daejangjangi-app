import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    flex-direction: row;
    gap: 8px;
  `,

  SortOption: styled.Pressable<{isSelected: boolean}>`
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

enum SortOption {
  POPULARITY = '인기순',
  LOW_PRICE = '낮은 가격순',
}

export default function ProductSortOptions() {
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.POPULARITY);

  const handleSelectSortOption = (option: SortOption) => {
    setSelectedSortOption(option);
  };

  return (
    <S.Container>
      <S.SortOption
        isSelected={selectedSortOption === SortOption.POPULARITY}
        onPress={() => handleSelectSortOption(SortOption.POPULARITY)}
      >
        <S.SortOptionText isSelected={selectedSortOption === SortOption.POPULARITY}>
          {SortOption.POPULARITY}
        </S.SortOptionText>
      </S.SortOption>
      <S.SortOption
        isSelected={selectedSortOption === SortOption.LOW_PRICE}
        onPress={() => handleSelectSortOption(SortOption.LOW_PRICE)}
      >
        <S.SortOptionText isSelected={selectedSortOption === SortOption.LOW_PRICE}>
          {SortOption.LOW_PRICE}
        </S.SortOptionText>
      </S.SortOption>
    </S.Container>
  );
}
