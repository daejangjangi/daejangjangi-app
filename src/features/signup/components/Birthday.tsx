import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import DatePicker from 'react-native-date-picker';

const S = {
  Container: styled.Pressable`
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;

    padding: 20px 60px;
    border: 1px solid #f6f5f4;
    border-radius: 8px;
  `,

  Section: styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
};

interface NumberProps {
  children: string;
  hasValue?: boolean;
}

function Number({children, hasValue}: NumberProps) {
  return (
    <AppText textType='T1' colorType={hasValue ? 'text' : 'textMedium'}>
      {children}
    </AppText>
  );
}

function Unit({children}: {children: string}) {
  return (
    <AppText textType='B2' colorType='textMedium'>
      {children}
    </AppText>
  );
}

interface BirthdayProps {
  defaultDate?: Date;
  onChangeDate: (date: Date) => void;
}

export default function Birthday({defaultDate, onChangeDate}: BirthdayProps) {
  const [changed, setChanged] = useState(!!defaultDate);
  const [date, setDate] = useState(defaultDate || new Date());
  const [open, setOpen] = useState(false);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedYear = changed ? year.toString().padStart(4, '0') : '0000';
  const formattedMonth = changed ? month.toString().padStart(2, '0') : '00';
  const formattedDay = changed ? day.toString().padStart(2, '0') : '00';

  const handleChangeDate = (confirmedDate: Date) => {
    setOpen(false);
    setDate(confirmedDate);
    setChanged(true);
    onChangeDate(confirmedDate);
  };

  return (
    <>
      <S.Container onPress={() => setOpen(true)}>
        <S.Section>
          <Number hasValue={changed}>{formattedYear}</Number>
          <Unit>년</Unit>
        </S.Section>

        <S.Section>
          <Number hasValue={changed}>{formattedMonth}</Number>
          <Unit>월</Unit>
        </S.Section>

        <S.Section>
          <Number hasValue={changed}>{formattedDay}</Number>
          <Unit>일</Unit>
        </S.Section>
      </S.Container>

      <DatePicker
        modal
        mode='date'
        title='날짜 선택'
        open={open}
        date={date}
        onConfirm={handleChangeDate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
