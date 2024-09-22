import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import {MaterialIcons} from '@expo/vector-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

// Custom Tab Bar Component
export default function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
      }}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : (route.name as string);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >
            {route.name === '(home)' && (
              <MaterialIcons name='home' size={24} color={isFocused ? '#673ab7' : '#222'} />
            )}
            {route.name === '(care)' && (
              <MaterialIcons name='event-note' size={24} color={isFocused ? '#673ab7' : '#222'} />
            )}
            {route.name === '(community)' && (
              <MaterialIcons name='people' size={24} color={isFocused ? '#673ab7' : '#222'} />
            )}
            {route.name === '(market)' && (
              <MaterialIcons name='build' size={24} color={isFocused ? '#673ab7' : '#222'} />
            )}
            <Text style={{color: isFocused ? '#673ab7' : '#222', fontSize: 12}}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        accessibilityRole='button'
        onPress={() => router.push('/(mypage)')}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <MaterialIcons name='person' size={24} color='#222' />
        <Text style={{color: '#222', fontSize: 12}}>마이</Text>
      </TouchableOpacity>
    </View>
  );
}
