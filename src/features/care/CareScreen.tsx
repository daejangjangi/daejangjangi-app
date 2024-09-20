import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';

export default function CareScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/(care)/diagnosis'>배변 분석</Link>
      <Link href='/(care)/diagnosis-result'>결과</Link>
    </View>
  );
}
