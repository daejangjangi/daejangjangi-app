import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import MyPageMenuItem from '@/src/features/mypage/components/MyPageMenuItem';
import {IcChat, IcHeart, IcPost} from '@/assets/images/icons';
import {useRouter} from 'expo-router';

const S = {
  Container: styled.View`
    gap: 20px;
  `,

  Menu: styled.View`
    gap: 8px;
  `,

  MenuItemContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
};

export default function MyPageMyActivity() {
  const router = useRouter();

  return (
    <S.Container>
      <AppText textType='B2Bold'>내 활동</AppText>

      <S.Menu>
        <MyPageMenuItem
          title='내가 쓴 글'
          onPress={() => router.navigate('/(community)/my-posts')}
          Icon={<IcPost />}
        />
        <MyPageMenuItem
          title='댓글 단 글'
          onPress={() => router.navigate('/(community)/commented-posts')}
          Icon={<IcChat />}
        />
        <MyPageMenuItem
          title='관심상품'
          onPress={() => router.navigate('/(market)/favorite')}
          Icon={<IcHeart />}
        />
      </S.Menu>
    </S.Container>
  );
}
