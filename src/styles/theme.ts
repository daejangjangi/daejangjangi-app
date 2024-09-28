import {DefaultTheme} from 'styled-components';

const colors = {
  main: '#ff286a',
  mainLight: '#ffe7ee',
  text: '#2d3541',
  textLight: '#eff1f5',
  textMedium: '#9b99a2',
};

interface Font {
  weight: number;
  size: number;
}

const WEIGHT_MAP = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
};

const FONT = ({weight, size}: Font): string => `
    font-family : Pretendard-${WEIGHT_MAP[weight]};
    font-size : ${size}px;
    `;

const fonts = {
  // Title
  T1: FONT({size: 20, weight: 700}),
  T2: FONT({size: 22, weight: 700}),
  T2Light: FONT({size: 22, weight: 500}),
  T3: FONT({size: 24, weight: 700}),
  T4: FONT({size: 26, weight: 700}),
  T5: FONT({size: 30, weight: 700}),

  // Body
  B1: FONT({size: 15, weight: 500}),
  B2: FONT({size: 17, weight: 500}),
  B2Bold: FONT({size: 17, weight: 700}),
  B3: FONT({size: 19, weight: 500}),

  // Caption
  C1: FONT({size: 11, weight: 400}),
  C2: FONT({size: 13, weight: 400}),
  C2Medium: FONT({size: 12, weight: 500}),
  C2Bold: FONT({size: 13, weight: 700}),

  // Logo
  logo: FONT({size: 20, weight: 900}),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

const theme: DefaultTheme = {
  colors,
  fonts,
};

export {theme};
