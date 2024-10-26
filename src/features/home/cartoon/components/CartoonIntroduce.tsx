import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    padding: 16px;
    gap: 10px;
  `,
};

export default function CartoonIntroduce() {
  const [introduceInfo, setIntroduceInfo] = useState({
    title: '대장툰',
    writer: '정수아',
    day: '화',
    description:
      '툰 개요를 적어주시면 됩니다~Lorem ipsum dolor sit amet consectetur. Euismod aenean adipiscing vel urna sit purus. Aenean sed duis ultricies massa sit rhoncus. Eget proin tempor velit nec et morbi risus. Ut ipsum egestas suspendisse viverra aenean ornare montes et.툰 개요를 적어주시면 됩니다~Lorem ipsum dolor sit ',
  });

  return (
    <S.Container>
      <AppText textType='T2'>{introduceInfo.title}</AppText>
      <AppText textType='C2'>
        {introduceInfo.writer} / 매주 {introduceInfo.day}요일 연재
      </AppText>
      <AppText textType='C2' colorType='textMedium'>
        {introduceInfo.description}
      </AppText>
    </S.Container>
  );
}
