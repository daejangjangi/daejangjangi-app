import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, Pressable} from 'react-native';

type CheckBoxProps = {
  values: string[];
};

const S = {
  CheckBoxContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Item: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  Text: styled.Text`
    font-size: 17px;
    font-weight: 500;
    font-family: Pretendard;
    color: '#2D3541';
  `,
};

export default function CommonCheckBox({values}: CheckBoxProps) {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(values.map(() => false));

  const onPressHandler = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  return (
    <S.CheckBoxContainer>
      {values.map((text, index) => (
        <S.Item key={index}>
          <S.Text>{text}</S.Text>
          <Pressable onPress={() => onPressHandler(index)}>
            <Image
              source={
                selectedItems[index]
                  ? require('assets/images/radio_button_checked.png')
                  : require('assets/images/radio_button.png')
              }
            />
          </Pressable>
        </S.Item>
      ))}
    </S.CheckBoxContainer>
  );
}
