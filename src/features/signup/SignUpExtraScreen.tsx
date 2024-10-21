import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import SignUpExtraHeader from '@/src/features/signup/components/layout/SignUpExtraHeader';
import SignUpNickName from '@/src/features/signup/steps/SignUpNickName';
import SignUpTermsOfService from '@/src/features/signup/steps/SignUpTermsOfService';
import SignUpBasicInfo from '@/src/features/signup/steps/SignUpBasicInfo';
import SignUpHealthConcerns from '@/src/features/signup/steps/SignUpHealthConcerns';
import SignUpProducts from '@/src/features/signup/steps/SignUpProducts';
import {useSignUpStore} from '@/src/stores';
import SignUpExtraFooter from '@/src/features/signup/components/layout/SignUpExtraFooter';

const S = {
  Container: styled.View`
    background-color: #fff;
    flex: 1;
    padding: 20px;
  `,

  Main: styled.View`
    flex: 1;
  `,

  Footer: styled.View``,
};

export default function SignUpExtraScreen() {
  const {step} = useSignUpStore(state => state);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <S.Container>
      <SignUpExtraHeader />

      <S.Main>
        {step === 1 && <SignUpNickName />}
        {step === 2 && <SignUpTermsOfService />}
        {step === 3 && <SignUpBasicInfo />}
        {step === 4 && <SignUpHealthConcerns />}
        {step === 5 && <SignUpProducts />}
      </S.Main>

      {!isKeyboardVisible && (
        <S.Footer>
          <SignUpExtraFooter />
        </S.Footer>
      )}
    </S.Container>
  );
}
