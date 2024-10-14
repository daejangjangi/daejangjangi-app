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
  FooterContainer: styled.View`
    position: absolute;
    padding: 20px;
    bottom: 0;
    left: 0;
    right: 0;
  `,
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

      {step === 1 && <SignUpNickName />}
      {step === 2 && <SignUpTermsOfService />}
      {step === 3 && <SignUpBasicInfo />}
      {step === 4 && <SignUpHealthConcerns />}
      {step === 5 && <SignUpProducts />}

      {/* Footer가 키보드 위로 나오지 않게 항상 고정 */}
      {!isKeyboardVisible && (
        <S.FooterContainer>
          <SignUpExtraFooter />
        </S.FooterContainer>
      )}
    </S.Container>
  );
}
