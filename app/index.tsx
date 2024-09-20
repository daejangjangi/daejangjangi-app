import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href='/signin'>SignIn</Link>
      <Link href='/signup'>SignUp</Link>
      <Link href='/(tabs)'>tabs</Link>
    </View>
  );
}
