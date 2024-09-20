import React from 'react';
import {Tabs} from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name='(home)' />
      <Tabs.Screen name='(care)' />
      <Tabs.Screen name='(community)' />
      <Tabs.Screen name='(market)' />
      <Tabs.Screen name='(mypage)' />
    </Tabs>
  );
}
