import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Board} from '@/src/api/types/post.type';
import {useLocalSearchParams} from 'expo-router';
import BoardPostList from './components/BoardPostList';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fbfcfe;
  `,

  CategoriesContainer: styled.View``,

  Categories: styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
  })`
    background-color: #fff;
    padding: 16px 20px;
  `,

  CategoriesContent: styled.View`
    flex-direction: row;
    padding-right: 40px;
    gap: 8px;
  `,

  Category: styled.Pressable<{isSelected: boolean}>`
    padding: 8px 16px;
    background-color: ${({isSelected, theme}) =>
      isSelected ? theme.colors.main : theme.colors.textLight};
    border-radius: 20px;
  `,

  CategoryText: styled(AppText)<{isSelected: boolean}>`
    color: ${({isSelected, theme}) => (isSelected ? '#fff' : theme.colors.text)};
  `,

  FlatList: styled.FlatList`
    flex: 1;
    margin-bottom: 40px;
    background-color: #fbfcfe;
  `,
};

const BOARD_CATEGORIES = [
  '인기',
  ...Object.values(Board).map(disease => disease.replace('\n', ' ')),
];

export default function BoardScreen() {
  const {board: selectedBoard} = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(selectedBoard);

  const handleCategoryPress = useCallback(board => {
    setSelectedCategory(board);
  }, []);

  return (
    <S.Container>
      <S.CategoriesContainer>
        <S.Categories>
          <S.CategoriesContent>
            {BOARD_CATEGORIES.map(board => (
              <S.Category
                key={board}
                isSelected={board === selectedCategory}
                onPress={() => handleCategoryPress(board)}
              >
                <S.CategoryText textType='C2' isSelected={board === selectedCategory}>
                  {board}
                </S.CategoryText>
              </S.Category>
            ))}
          </S.CategoriesContent>
        </S.Categories>
      </S.CategoriesContainer>

      <BoardPostList board={selectedCategory as Board} />
    </S.Container>
  );
}
