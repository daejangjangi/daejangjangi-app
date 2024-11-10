import React from 'react';
import {useReelsList} from '@/src/hooks/queries/reels';
import styled from 'styled-components/native';
import ReelsItem from './ReelsItem';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
    background-color: #fff;
  `,
};

export default function ReelsScreen() {
  const {data} = useReelsList();

  return (
    <S.Container>
      {data?.reelsInfoList.map(item => <ReelsItem key={item.id} item={item} />)}
    </S.Container>
  );
}
