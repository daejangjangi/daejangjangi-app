import React from 'react';
import styled from 'styled-components/native';
import {IcClose} from '@/assets/images/icons';
import {AppText} from '@/src/common/AppComponents';

const S = {
  RecentSearches: styled.View`
    padding: 20px 16px;
  `,

  RecentTitle: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,

  KeywordList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  `,

  KeywordItem: styled.Pressable`
    flex-direction: row;
    padding: 4px 6px;
    align-items: center;
    background-color: ${props => props.theme.colors.textLight};
    border-radius: 4px;
    gap: 4px;
  `,

  RemoveButton: styled.Pressable`
    padding: 4px;
  `,
};

interface MarketRecentSearchesProps {
  recentKeywords: string[];
  onKeywordPress: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export default function MarketRecentSearches({
  recentKeywords,
  onKeywordPress,
  onRemoveKeyword,
}: MarketRecentSearchesProps) {
  return (
    <S.RecentSearches>
      <S.RecentTitle>
        <AppText textType='B2'>최근 검색어</AppText>
      </S.RecentTitle>
      <S.KeywordList>
        {recentKeywords.map(k => (
          <S.KeywordItem key={k} onPress={() => onKeywordPress(k)}>
            <AppText textType='C2'>{k}</AppText>
            <S.RemoveButton onPress={() => onRemoveKeyword(k)}>
              <IcClose />
            </S.RemoveButton>
          </S.KeywordItem>
        ))}
      </S.KeywordList>
    </S.RecentSearches>
  );
}
