import {View, Text} from 'react-native';
import React from 'react';
import {useLocalSearchParams} from 'expo-router';
import {useQnaList} from '@/src/hooks/queries/qna';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {QnaStatus} from '@/src/api/types/qna.type';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #f9fafd;
    padding: 16px 20px;
    gap: 8px;
  `,

  Section: styled.View`
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.textLight};
  `,
};

export default function QnaDetail() {
  const {id} = useLocalSearchParams();
  const {data} = useQnaList();
  const qna = data?.myInfoList.find(q => q.id === Number(id));

  console.log('qna', qna);

  return (
    <S.Container>
      <AppText textType='C2' colorType='textMedium'>
        질문({qna?.category})
      </AppText>

      <S.Section>
        <AppText>{qna?.question}</AppText>
      </S.Section>

      <AppText textType='C2' colorType='textMedium'>
        답변
      </AppText>

      <S.Section>
        <AppText
          textType='C2'
          colorType={qna?.status === QnaStatus.답변대기 ? 'textMedium' : 'text'}
        >
          {qna?.status === QnaStatus.답변대기 ? '답변 대기중' : qna?.answer}
        </AppText>
      </S.Section>
    </S.Container>
  );
}
