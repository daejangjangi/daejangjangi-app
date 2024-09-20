import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

type SearchBarProps = {
  placeholder: string;
};

const S = {
  StyledView: styled.View<{text: string}>`
    padding: 20px;
    border: 1px solid ${props => (props.text.length > 0 ? '#FF286A' : '#9B99A2')};
    width: 200px;
    height: 100px;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
  `,
  StyledTextInput: styled.TextInput`
    flex: 1;
    height: 100%;
    color: #31302d;
    &::placeholder {
      color: #a29d99;
    }
    font-size: 17px;
    font-family: Pretendard;
    font-weight: 500;
  `,
  IconContainer: styled.View`
    padding-left: 10px;
  `,
};

export default function CommonSearchBar({placeholder}: SearchBarProps) {
  const [text, setText] = useState('');
  const maxLength = 5;

  return (
    <S.StyledView text={text}>
      <S.StyledTextInput
        value={text}
        onChangeText={(newText: string) => {
          if (newText.length <= maxLength) {
            setText(newText);
          }
        }}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <S.IconContainer>
        <Icon name='search' size={20} color='#9B99A2' />
      </S.IconContainer>
    </S.StyledView>
  );
}
