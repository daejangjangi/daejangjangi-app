import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Board} from '@/src/api/types/post.type';
import {useCreatePost} from '@/src/hooks/queries/post';
import {useRouter} from 'expo-router';
import SelectBoardModal from './components/SelectBoardModal';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: white;
    padding: 16px;
  `,

  TitleInput: styled.TextInput`
    font-size: 16px;
    padding: 12px 0;
    border-bottom-width: 1px;
    border-bottom-color: #eee;
  `,

  ContentInput: styled.TextInput`
    flex: 1;
    font-size: 15px;
    padding: 16px 0;
  `,

  SubmitButton: styled.TouchableOpacity`
    width: 100%;
    height: 56px;
    background-color: ${({theme}) => theme.colors.main};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  `,

  SubmitText: styled(AppText)`
    color: white;
  `,
};

export default function WriteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {mutateAsync: createPost} = useCreatePost();

  const isSubmitDisabled = !title.trim() || !content.trim();

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = async (boards: Board[]) => {
    try {
      await createPost({title, content, boards});

      router.push('/(tabs)/community/my-posts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Container>
      <S.TitleInput placeholder='제목' value={title} onChangeText={setTitle} />
      <S.ContentInput
        placeholder='내용을 입력하세요.'
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical='top'
      />
      <S.SubmitButton
        onPress={handleSubmit}
        disabled={isSubmitDisabled}
        style={{opacity: isSubmitDisabled ? 0.5 : 1}}
      >
        <S.SubmitText textType='B2Bold'>저장</S.SubmitText>
      </S.SubmitButton>

      <SelectBoardModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleModalSubmit}
      />
    </S.Container>
  );
}
