import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, Pressable} from 'react-native';
import {AppText} from '@/src/common/AppComponents';

type CheckBoxProps = {
  values: string[];
  onChange: (value: boolean[]) => void;
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
  Text: styled(AppText)`
    font-size: 17px;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  `,
};

export default function CommonCheckBox({values, onChange}: CheckBoxProps) {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(values.map(() => false));

  const onPressHandler = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    if (onChange) {
      onChange(newSelectedItems);
    }
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
