import React from 'react';
import {View} from 'react-native';
import {Link} from 'expo-router';
import styled, {ThemeProvider} from 'styled-components/native';

import {theme} from '@/src/styles/theme';
import {AppText} from '@/src/common/AppComponents';

const StyledText = styled(AppText)`
  font-size: 32px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.main};
`;

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledText>프리텐다드</StyledText>
        <Link href='/signin'>SignIn</Link>
        <Link href='/signup'>SignUp</Link>
        <Link href='/(tabs)'>tabs</Link>
      </View>
    </ThemeProvider>
  );
}
