import React from 'react';
import {Control, Controller, FieldErrors, FieldValues, UseControllerProps} from 'react-hook-form';
import styled from 'styled-components/native';
import {AppText, AppTextInput} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    flex-direction: column;
  `,

  StyledTextInput: styled(AppTextInput)<{$isDirty: boolean; $isError: boolean}>`
    border: 1px solid
      ${props => {
        if (props.$isError) {
          return props.theme.colors.main;
        }
        if (props.$isDirty) {
          return props.theme.colors.text;
        }
        return props.theme.colors.textMedium;
      }};
    border-radius: 8px;
    padding: 16px;
  `,

  ErrorMessage: styled(AppText)`
    color: ${props => props.theme.colors.main};
  `,
};

interface FormInputProps<T extends FieldValues> extends UseControllerProps<T> {
  placeholder: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  secure?: boolean;
}

export default function FormInput<T extends FieldValues>({
  placeholder,
  name,
  errors,
  control,
  rules = {},
  secure = false,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {isDirty}}) => (
        <S.Container>
          <S.StyledTextInput
            type='password'
            textType='B1'
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secure}
            $isDirty={isDirty && value}
            $isError={!!errors[name]}
          />
          {errors[name] && <S.ErrorMessage>{errors[name]?.message}</S.ErrorMessage>}
        </S.Container>
      )}
    />
  );
}
