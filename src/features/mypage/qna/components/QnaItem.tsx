import React from 'react';
import {Answer, QnaStatus} from '@/src/api/types/qna.type';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useRouter} from 'expo-router';

const S = {
  Container: styled.Pressable`
    padding: 16px 12px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.textLight};
    gap: 8px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  Status: styled.View<{status: QnaStatus}>`
    justify-content: center;
    align-items: center;
    padding: 5px 8px;
    border-radius: 4px;
    background-color: ${({theme, status}) =>
      status === QnaStatus.답변완료 ? theme.colors.mainLight : theme.colors.textLight};
  `,

  StatusText: styled.Text<{status: QnaStatus}>`
    font-size: 11px;
    line-height: 14px;
    color: ${({theme, status}) =>
      status === QnaStatus.답변완료 ? theme.colors.main : theme.colors.text};
  `,
};

interface QnaItemProps {
  qna: Answer;
}

export default function QnaItem({qna}: QnaItemProps) {
  const router = useRouter();

  return (
    <S.Container
      onPress={() =>
        router.push({
          pathname: '/others/mypage/qna-detail',
          params: {id: qna.id},
        })
      }
    >
      <S.Header>
        <AppText textType='C2' colorType='textMedium'>
          {qna.category}
        </AppText>

        <S.Status status={qna.status}>
          <S.StatusText textType='C1' status={qna.status}>
            {qna.status}
          </S.StatusText>
        </S.Status>
      </S.Header>

      <AppText textType='B1'>{qna.question}</AppText>
    </S.Container>
  );
}
