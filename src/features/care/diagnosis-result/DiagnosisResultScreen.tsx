import React from 'react';
import {IcDiagnosisResultHeart} from '@/assets/images/icons';
import {StoolColor} from '@/src/api/types/care.type';
import {AppText} from '@/src/common/AppComponents';
import {convertStoolColor, convertStoolForm} from '@/src/lib/care-converter';
import {format} from 'date-fns';
import styled from 'styled-components/native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useRegisterStoolDiagnosis} from '@/src/hooks/queries/care';
import {Alert} from 'react-native';

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

  ResultContainer: styled.ScrollView`
    margin-top: 16px;
    padding: 16px 16px;
    background-color: #fff;
    border-radius: 8px;
    max-height: 400px;
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

type DiagnosisResultParams = {
  diagnosisDescription: string;
  stoolDiagnose: string;
  stoolImageUrl: string;
};

export default function DiagnosisResultScreen() {
  const router = useRouter();

  const {diagnosisDescription, stoolDiagnose, stoolImageUrl} =
    useLocalSearchParams<DiagnosisResultParams>();
  const parsedStoolDiagnose = JSON.parse(stoolDiagnose);
  const {stoolAt, form, color} = parsedStoolDiagnose.stools[0];

  const {mutate: registerDiagnosis} = useRegisterStoolDiagnosis();

  const handleSave = () => {
    registerDiagnosis(
      {
        stoolDiagnose: parsedStoolDiagnose,
        diagnosisDescription,
        stoolImageUrl,
      },
      {
        onSuccess: () => {
          router.replace('/(tabs)/care');
        },
        onError: error => {
          Alert.alert('오류', '결과 저장 중 문제가 발생했습니다.');
          console.error(error);
        },
      },
    );
  };

  if (!diagnosisDescription || !stoolDiagnose) {
    return <AppText textType='B1'>결과가 없습니다.</AppText>;
  }

  return (
    <S.Container>
      <S.Header>
        <IcDiagnosisResultHeart />
        <AppText textType='B2Bold'>{format(new Date(stoolAt), 'yy.MM.dd')} 배변분석 결과</AppText>
      </S.Header>

      <S.ResultContainer>
        <S.ResultText textType='B1'>{diagnosisDescription}</S.ResultText>
      </S.ResultContainer>

      <S.Content>
        <AppText textType='B2'>작성 내용</AppText>
        <S.StoolInfoContainer>
          <S.StoolColorFill color={convertStoolColor(color)} />
          <AppText textType='B1'>{convertStoolForm(form)}</AppText>
          <AppText textType='C2' colorType='textMedium'>
            {format(stoolAt, 'HH:mm')}
          </AppText>
        </S.StoolInfoContainer>
      </S.Content>

      <S.Button onPress={handleSave}>
        <S.ButtonText textType='B1'>결과 내역 및 일지 저장하기</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
