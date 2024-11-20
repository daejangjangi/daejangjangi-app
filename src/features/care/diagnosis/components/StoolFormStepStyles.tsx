import styled from 'styled-components/native';
import {AppText, AppTextInput} from '@/src/common/AppComponents';

export const S = {
  ScrollContainer: styled.ScrollView`
    flex: 1;
    background-color: #fff;
  `,

  Container: styled.View`
    flex: 1;
    padding-bottom: 100px;
  `,

  TitleContainer: styled.View`
    margin-top: 48px;
    flex-direction: row;
    gap: 8px;
  `,

  BlueCheckContainer: styled.View`
    background-color: #529aff;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
  `,

  Title: styled(AppText)``,

  SubTitle: styled(AppText)`
    margin-top: 12px;
  `,

  FormSection: styled.View`
    margin-top: 36px;
    gap: 12px;
  `,

  Question: styled.View`
    margin-top: 24px;
    gap: 12px;
  `,

  AnswerContainer: styled.View``,

  AnswerRow: styled.View`
    flex-direction: row;
    gap: 8px;
    margin-bottom: 8px;
  `,

  SingleAnswerRow: styled.View`
    flex-direction: row;
    gap: 8px;
  `,

  AnswerButton: styled.TouchableOpacity<{$selected: boolean}>`
    flex: 1;
    padding: 12px;
    border-radius: 40px;
    background-color: #fff;
    border: 1px solid
      ${props => (props.$selected ? props.theme.colors.main : props.theme.colors.textLight)};
    align-items: center;
  `,

  AnswerText: styled(AppText)<{$selected: boolean}>`
    color: ${props => (props.$selected ? props.theme.colors.main : props.theme.colors.textMedium)};
  `,

  Description: styled.View`
    margin-top: 24px;
  `,

  TextInput: styled(AppTextInput)`
    margin-top: 12px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.textLight};
    background-color: #fff;
    height: 120px;
    text-align-vertical: top;
  `,
};
