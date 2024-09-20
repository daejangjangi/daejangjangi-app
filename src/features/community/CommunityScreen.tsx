import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';

export default function CommunityScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/(community)/board'>게시판</Link>
      <Link href='/(community)/post'>게시글</Link>
      <Link href='/(community)/search'>게시글 검색</Link>
      <Link href='/(community)/write'>글쓰기</Link>
      <Link href='/(community)/my-posts'>내가 쓴 글</Link>
      <Link href='/(community)/commented-posts'>댓글 단 글</Link>
    </View>
  );
}
