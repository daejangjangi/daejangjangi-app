import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      main: string;
      mainLight: string;
      text: string;
      textLight: string;
      textMedium: string;
    };
  }
}
