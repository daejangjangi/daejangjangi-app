import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useRouter} from 'expo-router';
import {DISEASES} from '@/src/common/data/health-concerns';
import {AppText} from '@/src/common/AppComponents';
import PostItem from '../components/PostItem';
import {TEMP_POSTS} from '../data/tempPosts';

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

const CONVERTED_DISEASES = DISEASES.map(disease => disease.replace('\n', ' '));

// @TODO: 실제 데이터 연동 필요
export default function BoardScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(CONVERTED_DISEASES[0]);

  const handleCategoryPress = (disease: string) => {
    setSelectedCategory(disease);
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
          {CONVERTED_DISEASES.map(disease => (
            <S.Category
              key={disease}
              isSelected={disease === selectedCategory}
              onPress={() => handleCategoryPress(disease)}
            >
              <S.CategoryText textType='C2' isSelected={disease === selectedCategory}>
                {disease}
              </S.CategoryText>
            </S.Category>
          ))}
        </S.CategoriesContent>
      </S.Categories>
      <S.Posts>
        {TEMP_POSTS.map(post => (
          <PostItem key={post.id} {...post} onPress={() => handlePostPress(post.id)} />
        ))}
      </S.Posts>
    </S.Container>
  );
}
