import React from 'react';
import styled from 'styled-components/native';
import {StoolColor} from '@/src/api/types/care.type';
import {convertStoolColor} from '@/src/lib/care-converter';

const S = {
  Section: styled.View`
    gap: 12px;
    margin-bottom: 20px;
  `,

  ColorContainer: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    justify-content: center;
  `,

  ColorButton: styled.TouchableOpacity<{isSelected: boolean; color: string}>`
    width: 14px;
    height: 22px;
    border-radius: 2px;
    background-color: ${props => props.color};
    border: 2px solid ${props => (props.isSelected ? props.theme.colors.main : 'transparent')};
  `,
};

interface StoolColorPickerProps {
  selectedColor: StoolColor;
  onColorSelect: (color: StoolColor) => void;
}

export default function StoolColorPicker({selectedColor, onColorSelect}: StoolColorPickerProps) {
  return (
    <S.Section>
      <S.ColorContainer>
        {Object.values(StoolColor).map(color => (
          <S.ColorButton
            key={color}
            color={convertStoolColor(color)}
            isSelected={selectedColor === color}
            onPress={() => onColorSelect(color)}
          />
        ))}
      </S.ColorContainer>
    </S.Section>
  );
}
