import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Animated} from 'react-native';
import {useSignUpStore} from '@/src/stores';

const S = {
  SafeAreaContainer: styled(SafeAreaView)``,

  ProgressBarFrame: styled.View`
    margin-top: 35px;
    height: 8px;
    border-radius: 8px;
    background-color: #f6f5f4;
  `,

  ProgressBar: styled(Animated.View)`
    background-color: ${props => props.theme.colors.main};
    height: 100%;
    border-radius: 8px;
  `,
};

export default function SignUpExtraHeader() {
  const {step} = useSignUpStore(state => state);
  const percentage = (step / 5) * 100;
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, percentage]);

  return (
    <S.SafeAreaContainer>
      <S.ProgressBarFrame>
        <S.ProgressBar
          style={{
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </S.ProgressBarFrame>
    </S.SafeAreaContainer>
  );
}
