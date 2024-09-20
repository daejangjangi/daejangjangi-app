import React from 'react';
import {Pressable, Text} from 'react-native';

type ButtonProps = {
  text: string;
  widthprops: number | string;
  heightprops: number | string;
  backgroundcolor: string;
  colorprops: string;
  fontSizeprops: number;
  paddingTB: number;
  paddingLR: number;
  fontWeightprops: number;
};

export default function CommonButton({
  text,
  widthprops,
  heightprops,
  backgroundcolor,
  colorprops,
  fontSizeprops,
  paddingTB,
  paddingLR,
  fontWeightprops,
}: ButtonProps) {
  return (
    <Pressable
      style={{
        width: widthprops,
        height: heightprops,
        paddingTop: paddingTB,
        paddingRight: paddingLR,
        paddingBottom: paddingTB,
        paddingLeft: paddingLR,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundcolor,
      }}
    >
      <Text
        style={{
          color: colorprops,
          fontSize: fontSizeprops,
          fontFamily: 'Pretendard',
          fontWeight: fontWeightprops,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
