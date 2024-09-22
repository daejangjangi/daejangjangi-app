import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/(home)/card-news'>카드 뉴스</Link>
      <Link href='/(home)/cartoon'>대장툰</Link>
      <Link href='/(home)/news-letter'>뉴스레터</Link>
      <Link href='/(home)/reels'>릴스</Link>
    </View>
  );
}
