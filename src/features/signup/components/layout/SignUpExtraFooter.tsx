import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useSignUpStore} from '@/src/stores';
import {useRouter} from 'expo-router';
import {Alert} from 'react-native';
import {useJoin} from '@/src/hooks/queries/member';
import {convertSignUpStateToJoinForm} from '@/src/utils/converter';

const S = {
  Buttons: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  `,

  Button: styled.Pressable<{$sub?: boolean}>`
    flex: 1;
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${props =>
      props.$sub ? props.theme.colors.textLight : props.theme.colors.main};
  `,

  ButtonText: styled(AppText)<{$sub?: boolean}>`
    color: ${props => (props.$sub ? props.theme.colors.textMedium : '#fff')};
  `,
};

export default function SignUpExtraFooter() {
  const router = useRouter();
  const signUpState = useSignUpStore();
  const {mutateAsync: join} = useJoin();

  const handleJoin = async () => {
    try {
      const joinForm = convertSignUpStateToJoinForm(signUpState);
      await join(joinForm);
      Alert.alert('알림', '회원가입이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => router.replace('/auth/signin'),
        },
      ]);
      signUpState.clear();
    } catch (error) {
      Alert.alert('오류', '회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  const goPrevStep = () => {
    if (signUpState.step === 1) {
      router.back();
      return;
    }

    signUpState.handlePrevStep();
  };

  const goNextStep = () => {
    if (signUpState.step === 5) {
      handleJoin();
      return;
    }

    signUpState.handleNextStep();
  };

  return (
    <S.Buttons>
      <S.Button onPress={() => goPrevStep()} $sub>
        <S.ButtonText textType='B3' $sub>
          이전
        </S.ButtonText>
      </S.Button>
      <S.Button onPress={() => goNextStep()}>
        <S.ButtonText textType='B3'>{signUpState.step === 5 ? '완료' : '다음'}</S.ButtonText>
      </S.Button>
    </S.Buttons>
  );
}
