import React from 'react';
import {Text, TextProps, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'PretendardVariable', // 기본 폰트 설정
  },
});

// eslint-disable-next-line react/function-component-definition
export const AppText: React.FC<TextProps> = props => (
  // eslint-disable-next-line react/destructuring-assignment,react/jsx-props-no-spreading
  <Text {...props} style={[styles.defaultText, props.style]}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </Text>
);

// eslint-disable-next-line react/function-component-definition
export const AppTextInput: React.FC<TextProps> = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading,react/destructuring-assignment
  <TextInput {...props} style={[styles.defaultText, props.style]} />
);
