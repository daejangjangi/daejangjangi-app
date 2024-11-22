import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useRouter} from 'expo-router';
import {IcNext, IcSearch} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';
import {AppTextInput} from '@/src/common/AppComponents';
import {usePostSearchStore} from '@/src/stores/post-search';
import {useSearchPosts} from '@/src/hooks/queries/post';

const S = {
  SafeAreaContainer: styled(SafeAreaView)`
    background-color: #fff;
  `,

  HeaderContainer: styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px 16px 8px 8px;
    gap: 4px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  BackButton: styled.Pressable``,

  SearchContainer: styled.View`
    flex: 1;
  `,

  SearchInputWrapper: styled.View<{isFocused: boolean}>`
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background};
    border-radius: 8px;
    border: 1px solid
      ${props => (props.isFocused ? props.theme.colors.main : props.theme.colors.textMedium)};
  `,

  SearchInput: styled(AppTextInput)`
    flex: 1;
    font-size: 15px;
    color: ${props => props.theme.colors.text};
  `,

  SearchIcon: styled.Pressable`
    margin-left: 8px;
    padding: 4px;
  `,
};

export default function SearchHeader() {
  const router = useRouter();
  const {setKeyword, setIsFocused, keyword} = usePostSearchStore();
  const [text, setText] = useState(keyword);
  const {refetch} = useSearchPosts(0, 10, text);

  const handleSearch = () => {
    if (text.trim()) {
      setKeyword(text.trim());
      refetch();
    }
    setIsFocused(false);
  };

  const handleTextChange = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    setText(keyword);
  }, [keyword]);

  return (
    <S.SafeAreaContainer>
      <S.HeaderContainer>
        <S.BackButton onPress={() => router.back()}>
          <IcNext width='48px' height='48px' color={theme.colors.text} />
        </S.BackButton>
        <S.SearchContainer>
          <S.SearchInputWrapper isFocused={usePostSearchStore().isFocused}>
            <S.SearchInput
              value={text}
              onChangeText={handleTextChange}
              maxLength={20}
              placeholder='검색어를 입력하세요'
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={handleSearch}
            />
            <S.SearchIcon onPress={handleSearch}>
              <IcSearch width={20} height={20} color={theme.colors.textMedium} />
            </S.SearchIcon>
          </S.SearchInputWrapper>
        </S.SearchContainer>
      </S.HeaderContainer>
    </S.SafeAreaContainer>
  );
}
