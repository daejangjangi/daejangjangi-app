import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import MyPageMenuItem from '@/src/features/mypage/components/MyPageMenuItem';
import {IcHeadphone, IcLock, IcQuestion} from '@/assets/images/icons';
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

export default function MyPageEtc() {
  const router = useRouter();

  return (
    <S.Container>
      <AppText textType='B2Bold'>기타</AppText>

      {/* @Todo: 문의하기 구현 필요 */}
      <S.Menu>
        <MyPageMenuItem title='문의하기' onPress={() => {}} Icon={<IcHeadphone />} />
        <MyPageMenuItem
          title='자주 묻는 질문'
          onPress={() => router.navigate('/(mypage)/faq')}
          Icon={<IcQuestion />}
        />
        <MyPageMenuItem
          title='계정'
          onPress={() => router.navigate('/(mypage)/account')}
          Icon={<IcLock />}
        />
      </S.Menu>
    </S.Container>
  );
}
