import React from 'react';
import SignInHeader from '@/src/features/signin/components/SignInHeader';
import SignInForm from '@/src/features/signin/components/SignInForm';
import SocialLoginForm from '@/src/features/signin/components/SocialLoginForm';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    flex-direction: column;
    padding: 20px;
    flex: 1;
  `,

  NormalForm: styled.View`
    margin-top: 80px;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 60px;
  `,

  SocialForm: styled.View`
    bottom: 0;
  `,
};

export default function SignInScreen() {
  return (
    <S.Container>
      <S.NormalForm>
        <SignInHeader />
        <SignInForm />
      </S.NormalForm>

      <S.SocialForm>
        <SocialLoginForm />
      </S.SocialForm>
    </S.Container>
  );
}
