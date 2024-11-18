import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Image, Pressable} from 'react-native';
import {AppText} from '@/src/common/AppComponents';

type CheckBoxProps = {
  values: string[];
  initialCheckedState?: boolean[];
  onChange: (value: boolean[]) => void;
  singleSelect?: boolean;
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

export default function CommonCheckBox({
  values,
  initialCheckedState,
  onChange,
  singleSelect = false,
}: CheckBoxProps) {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    initialCheckedState || values.map(() => false),
  );

  // 이전 initialCheckedState를 저장
  const prevInitialState = useRef(initialCheckedState);

  useEffect(() => {
    // initialCheckedState가 변경되었고, 이전 값과 다를 때만 업데이트
    if (
      initialCheckedState &&
      JSON.stringify(prevInitialState.current) !== JSON.stringify(initialCheckedState)
    ) {
      setSelectedItems(initialCheckedState);
      prevInitialState.current = initialCheckedState;
    }
  }, [initialCheckedState]);

  const onPressHandler = (index: number) => {
    const newSelectedItems = [...selectedItems];

    if (singleSelect) {
      // 단일 선택 모드: 다른 항목들은 모두 false로 설정
      newSelectedItems.fill(false);
      newSelectedItems[index] = !selectedItems[index];
    } else {
      // 다중 선택 모드: 기존 동작 유지
      newSelectedItems[index] = !newSelectedItems[index];
    }

    setSelectedItems(newSelectedItems);
    if (onChange) {
      onChange(newSelectedItems);
    }
  };

  return (
    <S.CheckBoxContainer>
      {values.map(text => (
        <S.Item key={`checkbox-${text}`}>
          <S.Text>{text}</S.Text>
          <Pressable onPress={() => onPressHandler(values.indexOf(text))}>
            <Image
              source={
                selectedItems[values.indexOf(text)]
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
