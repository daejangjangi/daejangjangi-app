import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppTextInput} from '@/src/common/AppComponents';
import {theme} from '@/src/styles/theme';

type SearchBarProps = {
  placeholder: string;
  maxLength: number;
  setSearchBarValue: (value: string) => void;
};

const S = {
  StyledView: styled.View<{text: string}>`
    padding: 20px;
    border: 1px solid
      ${props => (props.text.length > 0 ? props.theme.colors.main : props.theme.colors.textMedium)};
    width: 200px;
    height: 100px;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
  `,
  StyledTextInput: styled(AppTextInput)`
    flex: 1;
    height: 100%;
    color: #31302d;
    &::placeholder {
      color: #a29d99;
    }
    font-size: 17px;
    font-weight: 500;
  `,
  IconContainer: styled.View`
    padding-left: 10px;
  `,
};

export default function CommonSearchBar({
  placeholder,
  maxLength,
  setSearchBarValue,
}: SearchBarProps) {
  const [text, setText] = useState('');

  const handleTextChange = (newText: string) => {
    if (newText.length <= maxLength) {
      setText(newText);
      if (setSearchBarValue) {
        setSearchBarValue(newText);
      }
    }
  };

  return (
    <S.StyledView text={text}>
      <S.StyledTextInput
        value={text}
        onChangeText={handleTextChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <S.IconContainer>
        <Icon name='search' size={20} color={theme.colors.textMedium} />
      </S.IconContainer>
    </S.StyledView>
  );
}
