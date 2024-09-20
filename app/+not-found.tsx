import React from 'react';
import {Link, Stack} from 'expo-router';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: "Oops! This screen doesn't exist."}} />
      <View style={styles.container}>
        <Link href='/'>Go to home screen</Link>
      </View>
    </>
  );
}
