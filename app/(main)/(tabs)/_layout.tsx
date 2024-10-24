import React from 'react';
import {Tabs, usePathname} from 'expo-router';
import TabBar from '@/src/common/TabBar';

export default function TabLayout() {
  const pathname = usePathname();
  const displayTabBar = pathname === '/';

  return (
    <Tabs
      screenOptions={{headerShown: false}}
      tabBar={props => displayTabBar && <TabBar {...props} />}
      initialRouteName='(home)'
    >
      <Tabs.Screen name='(home)' options={{tabBarLabel: '홈'}} />
      <Tabs.Screen name='(care)' options={{tabBarLabel: '배변일지'}} />
      <Tabs.Screen name='(community)' options={{tabBarLabel: '커뮤니티'}} />
      <Tabs.Screen name='(market)' options={{tabBarLabel: '대장간'}} />
    </Tabs>
  );
}
