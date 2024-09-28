import React, {useState} from 'react';
import {Text} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components/native';
import {AppText, AppTextInput} from '@/src/common/AppComponents';

type TextFieldProps = {
  placeholder: string;
  maxLength: number;
  setTextFieldValue: (value: string) => void;
};

const S = {
  StyledView: styled.View<{text: string}>`
    padding: 20px;
    border: 1px solid
      ${props => (props.text.length > 0 ? props.theme.colors.main : props.theme.colors.textMedium)};
    width: 200px;
    height: 100px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  StyledTextInput: styled(AppTextInput)`
    width: 100%;
    height: 100%;
    color: #31302d;
    &::placeholder {
      color: #a29d99;
    }
    font-size: 17px;
    font-weight: 500;
  `,
  StyledTextContainer: styled.View`
    text-align: right;
    margin-top: 5px;
    flex-direction: row;
    justify-content: flex-end;
  `,
  NormalText: styled(AppText)`
    color: ${props => props.theme.colors.textMedium};
  `,
  HighlightText: styled.Text`
    color: ${props => props.theme.colors.main};
  `,
};

export default function CommonTextField({
  placeholder,
  maxLength,
  setTextFieldValue,
}: TextFieldProps) {
  const [text, setText] = useState('');

  const handleTextChange = (newText: string) => {
    if (newText.length <= maxLength) {
      setText(newText);
      if (setTextFieldValue) {
        setTextFieldValue(newText);
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
      <S.StyledTextContainer>
        {text.length === maxLength ? (
          <S.HighlightText>{text.length}</S.HighlightText>
        ) : (
          <S.NormalText>{text.length}</S.NormalText>
        )}

        <S.NormalText>{`/${maxLength}`}</S.NormalText>
      </S.StyledTextContainer>
    </S.StyledView>
  );
}
