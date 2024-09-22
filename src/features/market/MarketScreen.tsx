import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';

export default function MarketScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/(market)/search'>상품 검색</Link>
      <Link href='/(market)/favorite'>관심 상품</Link>
    </View>
  );
}
