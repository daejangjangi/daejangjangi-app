import React from 'react';
import {Tabs, usePathname} from 'expo-router';

export default function TabLayout() {
  const pathname = usePathname();

  const displayTabBar = pathname === '/' ? 'flex' : 'none';

  return (
    <Tabs screenOptions={{headerShown: false, tabBarStyle: {display: displayTabBar}}}>
      <Tabs.Screen name='(home)' />
      <Tabs.Screen name='(care)' />
      <Tabs.Screen name='(community)' />
      <Tabs.Screen name='(market)' />
      <Tabs.Screen name='(mypage)' />
    </Tabs>
  );
}
