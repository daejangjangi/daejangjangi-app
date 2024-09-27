import 'styled-components/native';
import {ColorsTypes, FontsTypes} from '@/src/styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
}
