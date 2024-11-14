import React, {useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {useRouter} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import {useHotPosts} from '@/src/hooks/queries/post';
import {usePostsByBoard} from '@/src/hooks/queries/board';
import {Board} from '@/src/api/types/post.type';
import PostItem from '../components/PostItem';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fbfcfe;
  `,

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

  Posts: styled.View`
    padding: 20px 16px;
    gap: 12px;
  `,
};

const BOARD_CATEGORIES = [
  '인기',
  ...Object.values(Board).map(disease => disease.replace('\n', ' ')),
];

export default function BoardScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(BOARD_CATEGORIES[0]);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  console.log(selectedCategory);

  const {data} = usePostsByBoard(selectedCategory as Board, page, PAGE_SIZE);
  const posts = data?.content ?? [];

  const handleCategoryPress = board => {
    setSelectedCategory(board);
    setPage(1);
  };

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  return (
    <S.Container>
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
      <S.Posts>
        {posts.map(post => (
          <PostItem key={post.id} {...post} onPress={() => handlePostPress(post.id)} />
        ))}
      </S.Posts>
    </S.Container>
  );
}
