import React from 'react';
import {useRouter} from 'expo-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import {theme} from '@/src/styles/theme';
import {IcCalendar, IcCommunity, IcHome, IcMarket, IcUser} from '@/assets/images/icons';

const S = {
  Container: styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 24px;
    height: 84px;
    border-top-width: 0.5px;
    border-color: ${theme.colors.textMedium};
  `,

  TabButton: styled.Pressable`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    width: 48px;
    height: 48px;
  `,

  TabTitle: styled.Text<{$isFocused?: boolean}>`
    font-family: 'PretendardVariable';
    font-size: 12px;
    font-weight: 500;
    color: ${props => (props.$isFocused ? '#31302D' : theme.colors.textMedium)};
  `,
};

export default function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const router = useRouter();

  return (
    <S.Container>
      {state.routes
        .filter(route => route.name !== 'index')
        .map((route, index) => {
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
              // @ts-ignore
              router.replace(`/${route.name.toString()}`);
            }
          };

          const fillColor = isFocused ? '#31302d' : theme.colors.textMedium;

          return (
            <S.TabButton
              key={route.key}
              accessibilityRole='button'
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
            >
              {route.name === '(home)' && <IcHome width='24px' height='24px' color={fillColor} />}
              {route.name === '(care)' && (
                <IcCalendar width='24px' height='24px' color={fillColor} />
              )}
              {route.name === '(community)' && (
                <IcCommunity width='24px' height='24px' color={fillColor} />
              )}
              {route.name === '(market)' && (
                <IcMarket width='24px' height='24px' color={fillColor} />
              )}
              <S.TabTitle $isFocused={isFocused}>{label as string}</S.TabTitle>
            </S.TabButton>
          );
        })}
      <S.TabButton accessibilityRole='button' onPress={() => router.push('/(mypage)')}>
        <IcUser width='24px' height='24px' color={theme.colors.textMedium} />
        <S.TabTitle>마이</S.TabTitle>
      </S.TabButton>
    </S.Container>
  );
}
