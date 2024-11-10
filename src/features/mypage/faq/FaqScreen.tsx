import React from 'react';
import styled from 'styled-components/native';
import FaqAccordion from '@/src/features/mypage/faq/FaqAccordion';
import {useFaqList} from '@/src/hooks/queries/faq';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
    padding: 20px;
  `,
};

export default function FaqScreen() {
  const {data} = useFaqList();
  const faqItems = data?.faqList || [];

  return (
    <S.Container>
      {faqItems.length > 0 ? (
        faqItems?.map(item => (
          <FaqAccordion key={item.id} title={item.question} body={item.answer} />
        ))
      ) : (
        <AppText textType='B2'>자주 묻는 질문이 없습니다.</AppText>
      )}
    </S.Container>
  );
}
