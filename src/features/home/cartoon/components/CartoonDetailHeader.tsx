import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import styled from 'styled-components/native';
import {IcNext} from '@/assets/images/icons';
import {AppText} from '@/src/common/AppComponents';
import {theme} from '@/src/styles/theme';

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

  Title: styled(AppText)`
    flex: 1;
  `,
};

interface CartoonDetailHeaderProps {
  episode?: string;
  title?: string;
}

export default function CartoonDetailHeader({episode, title}: CartoonDetailHeaderProps) {
  const router = useRouter();

  return (
    <S.SafeAreaContainer>
      <S.HeaderContainer>
        <TouchableOpacity onPress={() => router.back()}>
          <IcNext width='48px' height='48px' color={theme.colors.text} />
        </TouchableOpacity>
        <S.Title textType='B2Bold'>{`제 ${episode}화 ${title}`}</S.Title>
      </S.HeaderContainer>
    </S.SafeAreaContainer>
  );
}
