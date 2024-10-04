import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components/native';
import CommonTextField from '@/src/common/CommonTextField';
import FormInput from '@/src/common/form/FormInput';
import FormButton from '@/src/common/form/FormButton';
import {Link} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    flex-direction: column;
    width: 100%;
  `,

  InputGroup: styled.View`
    gap: 12px;
    margin-bottom: 24px;
  `,

  Buttons: styled.View`
    margin-bottom: 16px;
  `,

  SignUpSection: styled.View`
    justify-content: center;
    align-items: center;
  `,

  SignUpLink: styled(Link)`
    padding: 4px 2px;

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${props => props.theme.colors.textMedium};
  `,

  SignUpText: styled(AppText)`
    text-align: center;
    color: ${props => props.theme.colors.textMedium};
  `,

  TextInput: styled(CommonTextField)`
    flex: 1;
  `,
};

interface Inputs {
  email: string;
  password: string;
}

const rules = {
  email: {
    required: '이메일을 입력해주세요',
  },

  password: {
    required: '비밀번호를 입력해주세요',
  },
};

export default function SignInForm() {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <S.Container>
      <S.InputGroup>
        <FormInput
          name='email'
          errors={errors}
          control={control}
          rules={rules.email}
          placeholder='이메일을 입력하세요'
        />
        <FormInput
          name='password'
          errors={errors}
          control={control}
          rules={rules.password}
          placeholder='비밀번호를 입력하세요'
          secure
        />
      </S.InputGroup>

      <S.Buttons>
        <FormButton title='이메일로 로그인' onPress={handleSubmit(onSubmit)} />
      </S.Buttons>

      <S.SignUpSection>
        <S.SignUpLink href='/signup'>
          <S.SignUpText>회원가입</S.SignUpText>
        </S.SignUpLink>
      </S.SignUpSection>
    </S.Container>
  );
}
