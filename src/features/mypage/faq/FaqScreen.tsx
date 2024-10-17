import React from 'react';
import styled from 'styled-components/native';
import FaqAccordion from '@/src/features/mypage/faq/FaqAccordion';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
    padding: 20px;
  `,
};

export default function FaqScreen() {
  /**
   * @Todo: 내용 불러오기 로직 구현
   */

  return (
    <S.Container>
      <FaqAccordion title='비밀번호를 잊어버렸어요.' body='비밀번호를 잊어버렸어요.' />
      <FaqAccordion
        title='추가 등록 회원도 맞춤 상품 추천 받을 수 있나요?'
        body='추가 등록 회원도 맞춤 상품 추천 받을 수 있나요?'
      />
    </S.Container>
  );
}
