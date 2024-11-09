import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText, AppTextInput} from '@/src/common/AppComponents';
import {QnaCategory} from '@/src/api/types/qna.type';
import {useCreateQna} from '@/src/hooks/queries/qna';
import {useRouter} from 'expo-router';
import {Alert} from 'react-native';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #f9fafd;
    padding: 16px;
  `,

  CategoryContainer: styled.View`
    flex-direction: row;
    gap: 8px;
    margin-bottom: 16px;
  `,

  CategoryButton: styled.Pressable<{$isSelected: boolean}>`
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${props =>
      props.$isSelected ? props.theme.colors.main : props.theme.colors.textLight};
  `,

  CategoryText: styled(AppText)<{$isSelected: boolean}>`
    color: ${props => (props.$isSelected ? '#fff' : props.theme.colors.text)};
  `,

  Description: styled(AppTextInput)`
    flex: 1;
    margin-bottom: 24px;
    padding: 16px;
    background-color: #fff;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.textLight};
    text-align-vertical: top;
  `,

  Button: styled.TouchableOpacity`
    border-radius: 8px;
    padding: 16px;
    background-color: ${props => props.theme.colors.main};
    align-items: center;
  `,

  ButtonText: styled(AppText)`
    color: #fff;
  `,
};

export default function QnaWriteScreen() {
  const router = useRouter();
  const {mutate: createQna} = useCreateQna();

  const [selectedCategory, setSelectedCategory] = useState<QnaCategory>(QnaCategory.기능제안);
  const [description, setDescription] = useState('');

  const categories = Object.values(QnaCategory).filter(value => typeof value === 'string');

  const handleCategoryPress = (category: QnaCategory) => {
    setSelectedCategory(category);
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('알림', '문의 내용을 입력해주세요.');
      return;
    }

    createQna(
      {
        category: selectedCategory,
        question: description,
      },
      {
        onSuccess: () => {
          Alert.alert('알림', '문의가 등록되었습니다.', [
            {
              text: '확인',
              onPress: () => router.back(),
            },
          ]);
        },
        onError: () => {
          Alert.alert('오류', '문의 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <S.Container>
      <S.CategoryContainer>
        {categories.map(category => (
          <S.CategoryButton
            key={category}
            $isSelected={selectedCategory === category}
            onPress={() => handleCategoryPress(category)}
          >
            <S.CategoryText textType='C2' $isSelected={selectedCategory === category}>
              {category}
            </S.CategoryText>
          </S.CategoryButton>
        ))}
      </S.CategoryContainer>

      <S.Description
        textType='B1'
        multiline
        placeholder='문의하고자 하는 내용을 입력해주세요. 서비스를 사용하시면서 궁금한 점, 개선되어야 할 점에 대해 자유롭게 의견 주세요. 새로운 기능제안도 환영입니다.'
        value={description}
        onChangeText={setDescription}
      />

      <S.Button onPress={handleSubmit}>
        <S.ButtonText textType='B2Bold'>1:1 문의하기</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
