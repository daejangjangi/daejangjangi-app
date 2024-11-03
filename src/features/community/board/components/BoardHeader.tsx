import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import styled from 'styled-components/native';
import {theme} from '@/src/styles/theme';
import {IcNext, IcSearch} from '@/assets/images/icons';

const S = {
  SafeAreaContainer: styled(SafeAreaView)`
    background-color: #fff;
  `,

  HeaderContainer: styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  Title: styled.Text`
    font-family: 'Pretendard-Bold';
    font-size: 22px;
    line-height: 33px;
    color: ${theme.colors.text};
  `,

  RightSection: styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  `,

  SearchButton: styled.Pressable`
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  `,
};

export default function BoardHeader() {
  const router = useRouter();

  const handleSearchPress = () => {
    router.push('/(tabs)/community/search');
  };

  return (
    <S.SafeAreaContainer>
      <S.HeaderContainer>
        <TouchableOpacity onPress={() => router.back()}>
          <IcNext width='48px' height='48px' color={theme.colors.text} />
        </TouchableOpacity>

        <S.Title>커뮤니티</S.Title>

        <S.RightSection>
          <S.SearchButton onPress={handleSearchPress}>
            <IcSearch width={24} height={24} color={theme.colors.text} />
          </S.SearchButton>
        </S.RightSection>
      </S.HeaderContainer>
    </S.SafeAreaContainer>
  );
}
