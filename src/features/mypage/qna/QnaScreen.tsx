import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcPencilFill} from '@/assets/images/icons';
import {useRouter} from 'expo-router';
import {useQnaList} from '@/src/hooks/queries/qna';
import QnaItem from './components/QnaItem';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #f9fafd;
    padding: 16px;
    gap: 8px;
  `,

  WriteButton: styled.TouchableOpacity`
    position: absolute;
    bottom: 32px;
    right: 26px;

    background-color: ${({theme}) => theme.colors.main};
    width: 68px;
    height: 68px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
  `,
};

export default function QnaScreen() {
  const router = useRouter();

  const {data} = useQnaList();
  const qnaList = data?.myInfoList ?? [];

  return (
    <S.Container>
      {qnaList.length > 0 ? (
        qnaList.map(qna => <QnaItem key={qna.id} qna={qna} />)
      ) : (
        <AppText>문의 내역이 없습니다.</AppText>
      )}

      <S.WriteButton onPress={() => router.push('/others/mypage/qna-write')}>
        <IcPencilFill />
      </S.WriteButton>
    </S.Container>
  );
}
