import React from 'react';
import {IcDiagnosisResultHeart} from '@/assets/images/icons';
import {StoolColor, StoolForm} from '@/src/api/types/care.type';
import {AppText} from '@/src/common/AppComponents';
import {convertStoolColor, convertStoolForm} from '@/src/lib/care-converter';
import {format} from 'date-fns';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px 16px;
    background-color: #ffd3e0;
    position: relative;
  `,

  Header: styled.View`
    flex-direction: row;
    gap: 8px;
    align-items: center;
  `,

  ResultContainer: styled.View`
    margin-top: 16px;
    padding: 24px 16px;
    background-color: #fff;
    border-radius: 8px;
  `,

  ResultText: styled(AppText)`
    line-height: 21px;
  `,

  Content: styled.View`
    margin-top: 12px;
    padding: 16px 21px;
    background-color: ${props => props.theme.colors.mainLight};
    border-radius: 8px;
  `,

  StoolInfoContainer: styled.View`
    margin-top: 12px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  StoolColorFill: styled.View<{color: StoolColor}>`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${props => props.color};
  `,

  Button: styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    left: 16px;
    right: 16px;
    padding: 16px 0;
    background-color: ${props => props.theme.colors.main};
    border-radius: 8px;
    align-items: center;
  `,

  ButtonText: styled(AppText)`
    color: #ffffff;
  `,
};

const TEMP_DATA = {
  date: '2024-03-21T12:00:00Z',
  result: `안녕하세요.
대장장이 AI 입니다.


국제적 기준에 따르면 현재 아기는 영아 변비를 앓고 있는 것으로 확인됩니다. 
식이섬유와 수분 섭취를 늘리며 상태를 지켜보고 잘 해결되지 않을 경우 병원에 방문해 자세한 상담을 받을 필요가 있습니다. 때론 아기가 고형식을 시작했을 때 변비 증세를 보이기도 합니다.
국제적 기준에 따르면 현재 아기는 영아 변비를 앓고 있는 것으로 확인됩니다. 식이섬유와 수분 섭취를 늘리며 상태를 지켜보고 잘 해결되지 않을 경우 병원에 방문해 자세한 상담을 받을 필요가 있습니다. 때론 아기가 고형식을 시작했을 때 변비 증세를 보이기도 합니다.`,
  form: StoolForm.A_LITTLE_LOOSE,
  color: StoolColor.BROWN,
};

export default function DiagnosisResultScreen() {
  return (
    <S.Container>
      <S.Header>
        <IcDiagnosisResultHeart />
        <AppText textType='B2Bold'>
          {format(new Date(TEMP_DATA.date), 'yy.MM.dd')} 배변분석 결과
        </AppText>
      </S.Header>

      <S.ResultContainer>
        <S.ResultText textType='B1'>{TEMP_DATA.result}</S.ResultText>
      </S.ResultContainer>

      <S.Content>
        <AppText textType='B2'>작성 내용</AppText>
        <S.StoolInfoContainer>
          <S.StoolColorFill color={convertStoolColor(TEMP_DATA.color)} />
          <AppText textType='B1'>{convertStoolForm(TEMP_DATA.form)}</AppText>
          <AppText textType='C2' colorType='textMedium'>
            {format(new Date(TEMP_DATA.date), 'HH:mm')}
          </AppText>
        </S.StoolInfoContainer>
      </S.Content>

      <S.Button>
        <S.ButtonText textType='B1'>결과 내역 및 일지 저장하기</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
