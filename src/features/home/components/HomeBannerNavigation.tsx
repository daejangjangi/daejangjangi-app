import React from 'react';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,

  Circle: styled.View`
    width: 6px;
    height: 6px;
    border-radius: 4px;

    background-color: #fff;
  `,

  Selected: styled.View`
    width: 20px;
    height: 6px;
    border-radius: 4px;

    background-color: ${props => props.theme.colors.main};
  `,
};

interface HomeBannerNavigationProps {
  currPage: number;
  maxPage: number;
}

export default function HomeBannerNavigation({currPage, maxPage}: HomeBannerNavigationProps) {
  const arr = Array.from({length: maxPage + 1}, (_, i) => i);

  return (
    <S.Container>
      {arr.map(index =>
        index === currPage ? <S.Selected key={index} /> : <S.Circle key={index} />,
      )}
    </S.Container>
  );
}
