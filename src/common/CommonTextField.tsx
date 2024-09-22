import React, {useState} from 'react';
import {Text} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components/native';

type TextFieldProps = {
  placeholder: string;
  maxLength: number;
  setTextFieldValue: (value: string) => void;
};

const S = {
  StyledView: styled.View<{text: string}>`
    padding: 20px;
    border: 1px solid ${props => (props.text.length > 0 ? '#FF286A' : '#9B99A2')};
    width: 200px;
    height: 100px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  StyledTextInput: styled.TextInput`
    width: 100%;
    height: 100%;
    color: #31302d;
    &::placeholder {
      color: #a29d99;
    }
    font-size: 17px;
    font-family: Pretendard;
    font-weight: 500;
  `,
  StyledTextContainer: styled.View`
    text-align: right;
    margin-top: 5px;
    flex-direction: row;
    justify-content: flex-end;
  `,
  NormalText: styled.Text`
    color: #9b99a2;
  `,
  HighlightText: styled.Text`
    color: #ff286a;
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
