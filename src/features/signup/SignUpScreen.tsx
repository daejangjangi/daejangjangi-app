import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import FormButton from '@/src/common/form/FormButton';
import {SubmitHandler, useForm, useWatch} from 'react-hook-form';
import FormInput from '@/src/common/form/FormInput';
import {useRouter} from 'expo-router';

const S = {
  Container: styled.View`
    background-color: #fff;
    flex: 1;
    padding: 33px 20px;
    gap: 32px;
  `,

  Section: styled.View`
    flex-direction: column;
    gap: 12px;
  `,

  Label: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,
};

interface Inputs {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function SignUpScreen() {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Inputs>();
  const router = useRouter();

  const passwordValue = useWatch({
    control,
    name: 'password', // 관찰할 필드명
  });

  const rules = {
    email: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: '올바른 이메일 주소를 입력해주세요',
      },
    },

    password: {
      required: '비밀번호를 입력해주세요',
      validate: {
        minLength: value => value.length >= 8 || '비밀번호는 최소 8자리 이상이어야 합니다.',
        hasUpperAndLower: value =>
          (/[a-z]/.test(value) && /[A-Z]/.test(value)) || '대소문자를 모두 포함해야 합니다.',
        hasNumber: value => /\d/.test(value) || '숫자를 포함해야 합니다.',
        hasSpecialChar: value =>
          /[!@#$%^&*(),.?":{}|<>]/.test(value) || '특수문자를 포함해야 합니다.',
      },
    },

    passwordCheck: {
      required: '비밀번호 확인을 입력해주세요',
      validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
    },
  };

  /**
   * @TODO: 이메일 중복 검사
   * @TODO: 회원가입 전반적인 상태관리 추가
   */
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    router.push('/signup-extra');
  };

  return (
    <S.Container>
      <S.Section>
        <S.Label textType='B2Bold'>이메일</S.Label>
        <FormInput
          name='email'
          placeholder='이메일을 입력하세요'
          control={control}
          errors={errors}
          rules={rules.email}
        />
      </S.Section>

      <S.Section>
        <S.Label textType='B2Bold'>비밀번호</S.Label>
        <FormInput
          name='password'
          placeholder='비밀번호 입력'
          control={control}
          errors={errors}
          rules={rules.password}
          description='영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력'
          secure
        />
        <FormInput
          name='passwordCheck'
          placeholder='비밀번호 확인'
          control={control}
          errors={errors}
          rules={rules.passwordCheck}
          secure
        />
      </S.Section>

      <S.Section>
        <FormButton title='회원가입' onPress={handleSubmit(onSubmit)} />
      </S.Section>
    </S.Container>
  );
}
