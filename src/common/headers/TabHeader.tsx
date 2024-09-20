import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

/**
 * @TODO: 스타일 컴포넌트로 변경 필요
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // padding: 10,
  },
  header: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 10,
    height: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

interface CustomHeaderProps {
  title: string;
}

export default function TabHeader({title}: CustomHeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={() => router.push('/(mypage)')}>
          <Text style={styles.buttonText}>내 정보</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(mypage)/notification')}>
          <Text style={styles.buttonText}>알림</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
