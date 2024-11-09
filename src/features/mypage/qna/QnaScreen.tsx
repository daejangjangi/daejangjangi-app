import React from 'react';
import styled from 'styled-components/native';
import {Answer, QnaCategory, QnaStatus} from '@/src/api/types/qna.type';
import QnaItem from './components/QnaItem';
import {AppText} from '@/src/common/AppComponents';
import {IcPencilFill} from '@/assets/images/icons';
import {useRouter} from 'expo-router';
import {useQnaList} from '@/src/hooks/queries/qna';

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

const TEMP_DATA: Answer[] = [
  {
    id: 1,
    category: QnaCategory.기능제안,
    question: '커뮤니티에서 익명의 누군가가 저에게 모욕적인 말을 했습니다. 혹시 신고 가능한가요?',
    status: QnaStatus.답변대기,
  },
  {
    id: 2,
    category: QnaCategory.문의사항,
    question: '문의사항 질문입니다.',
    status: QnaStatus.답변완료,
    answer: '답변입니다.',
  },
];

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
