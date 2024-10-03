import React from 'react';
import {View} from 'react-native';
import {Link} from 'expo-router';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';

const StyledText = styled(AppText)`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.main};
`;

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText textType='T5'>프리텐다드</StyledText>
      <Link href='/signin'>SignIn</Link>
      <Link href='/signup'>SignUp</Link>
      <Link href='/(tabs)'>tabs</Link>
    </View>
  );
}
