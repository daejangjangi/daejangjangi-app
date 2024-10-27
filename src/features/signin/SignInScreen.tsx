import React, {useEffect, useRef} from 'react';
import SignInHeader from '@/src/features/signin/components/SignInHeader';
import SignInForm from '@/src/features/signin/components/SignInForm';
import SocialLoginForm from '@/src/features/signin/components/SocialLoginForm';
import styled from 'styled-components/native';
import {KeyboardAvoidingView, Platform, Keyboard, Animated} from 'react-native';

const S = {
  Container: styled(KeyboardAvoidingView)`
    flex: 1;
    background-color: #fff;
  `,

  MainContent: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 60px;
    padding: 20px;
  `,

  Footer: styled(Animated.View)`
    padding: 20px;
  `,
};

export default function SignInScreen() {
  const footerAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        Animated.timing(footerAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(footerAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [footerAnimation]);

  return (
    <S.Container
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <S.MainContent>
        <SignInHeader />
        <SignInForm />
      </S.MainContent>

      <S.Footer
        style={{
          opacity: footerAnimation,
          transform: [
            {
              translateY: footerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <SocialLoginForm />
      </S.Footer>
    </S.Container>
  );
}
