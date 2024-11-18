import React from 'react';
import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';
import {View} from 'react-native';
import {AppText} from '@/src/common/AppComponents';
import {StoolForm} from '@/src/api/types/care.type';
import {theme} from '@/src/styles/theme';
import {convertStoolForm} from '@/src/lib/care-converter';

const S = {
  SliderContainer: styled.View`
    width: 100%;
  `,

  SliderMarks: styled.View`
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    padding: 0 16px;
  `,

  SliderMark: styled.View`
    width: 2px;
    height: 8px;
    background-color: #e5e5e5;
    margin-top: 16px;
  `,

  FormLabel: styled(AppText)`
    margin-top: 8px;
    text-align: center;
  `,

  Result: styled(AppText)`
    margin-top: 8px;
    text-align: center;
  `,
};

interface StoolFormSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StoolFormSlider({value, onChange}: StoolFormSliderProps) {
  const getFormLabel = (value: number) => {
    switch (value) {
      case 1:
        return StoolForm.VERY_HARD;
      case 2:
        return StoolForm.HARD;
      case 3:
        return StoolForm.A_LITTLE_HARD;
      case 4:
        return StoolForm.FORMED;
      case 5:
        return StoolForm.A_LITTLE_LOOSE;
      case 6:
        return StoolForm.LOOSE;
      case 7:
        return StoolForm.VERY_LOOSE;
      default:
        return StoolForm.FORMED;
    }
  };

  return (
    <S.SliderContainer>
      <S.SliderMarks>
        {[...Array(7)].map((_, index) => (
          <S.SliderMark
            key={index}
            style={{
              marginLeft: index === 0 ? 0 : -1,
              marginRight: index === 6 ? 0 : -1,
            }}
          />
        ))}
      </S.SliderMarks>

      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={1}
        maximumValue={7}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor='#E5E5E5'
        maximumTrackTintColor='#E5E5E5'
        thumbTintColor={theme.colors.main}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <S.FormLabel textType='C2'>매우 딱딱함</S.FormLabel>
        <S.FormLabel textType='C2'>매우 묽음</S.FormLabel>
      </View>

      <S.Result textType='B1' colorType='main'>
        {convertStoolForm(getFormLabel(value))}
      </S.Result>
    </S.SliderContainer>
  );
}
