import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {CareLog, StoolColor, StoolForm} from '@/src/api/types/care.type';
import {IcPencil, IcPoop} from '@/assets/images/icons';
import {convertStoolColor, convertStoolForm} from '@/src/lib/care-converter';

const S = {
  Container: styled.View`
    background-color: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    gap: 12px;
  `,

  Header: styled.View`
    padding: 8px 0;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  Logs: styled.View`
    gap: 12px;
  `,

  LogContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,

  LogTime: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  LogInfo: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
  `,

  LogColor: styled.View<{$color: string}>`
    width: 8px;
    height: 16px;
    border-radius: 2px;
    background-color: ${props => props.$color};
  `,
};

const TEMP_DATA: CareLog[] = [
  {
    id: 1,
    date: '2024-11-18T07:30:00+09:00',
    form: StoolForm.VERY_LOOSE,
    color: StoolColor.BRIGHT_RED,
  },
  {
    id: 2,
    date: '2024-11-18T14:30:00+09:00',
    form: StoolForm.LOOSE,
    color: StoolColor.BRIGHT_RED,
  },
];

function LogItem({log}: {log: CareLog}) {
  const {date, form, color} = log;

  const formattedDate = new Date(date);
  const hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();
  const ampm = hours < 12 ? '오전' : '오후';
  const displayHours = hours % 12 || 12;
  const displayTime = `${ampm} ${displayHours}시 ${minutes}분`;

  return (
    <S.LogContainer>
      <S.LogTime>
        <IcPoop />
        <AppText textType='C1' colorType='textMedium'>
          {displayTime}
        </AppText>
      </S.LogTime>

      <S.LogInfo>
        <AppText textType='C2'>{convertStoolForm(form)}</AppText>
        <S.LogColor $color={convertStoolColor(color)} />
        <IcPencil width={16} height={16} />
      </S.LogInfo>
    </S.LogContainer>
  );
}

export default function TodayLogs() {
  return (
    <S.Container>
      <S.Header>
        <AppText textType='B2Bold'>오늘의 배변일지</AppText>
      </S.Header>

      <S.Logs>
        {TEMP_DATA.map(log => (
          <LogItem key={log.id} log={log} />
        ))}
      </S.Logs>
    </S.Container>
  );
}
