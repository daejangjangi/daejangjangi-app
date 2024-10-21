import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcArrowRightS} from '@/assets/images/icons';

const S = {
  Container: styled.View``,

  AccordionHeader: styled.Pressable<{$open: boolean}>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 8px 20px;
    border-bottom-width: ${props => (props.$open ? '0' : '1px')};
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  AccordionBody: styled.View`
    background-color: #fbfbfe;
    padding: 32px 20px;
  `,
};

interface FaqAccordionProps {
  title: string;
  body: string;
}

export default function FaqAccordion({title, body}: FaqAccordionProps) {
  const [open, setOpen] = useState(false);

  const toggleAccordionOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <S.Container>
      <S.AccordionHeader $open={open} onPress={() => toggleAccordionOpen()}>
        <AppText textType='B1'>{title}</AppText>

        <IcArrowRightS rotation={open ? 270 : 90} style={{marginRight: -8}} />
      </S.AccordionHeader>

      {open && (
        <S.AccordionBody>
          <AppText textType='C2'>{body}</AppText>
        </S.AccordionBody>
      )}
    </S.Container>
  );
}
