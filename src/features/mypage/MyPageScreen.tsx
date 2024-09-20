import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';

export default function MyPageScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/(mypage)/profile'>프로필</Link>
      <Link href='/(mypage)/faq'>자주묻는 질문</Link>
      <Link href='/(mypage)/account'>계정</Link>
    </View>
  );
}
