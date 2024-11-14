import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcArrowRightS, IcPin} from '@/assets/images/icons';
import {useRouter} from 'expo-router';
import {Board} from '@/src/api/types/post.type';
import {usePostsByBoard} from '@/src/hooks/queries/board';
import PostBody from './PostBody';

const S = {
  Container: styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  Header: styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
  `,

  Title: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  Dot: styled.View`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.main};
  `,

  Content: styled.View`
    padding: 0 12px 12px 12px;
    gap: 12px;
  `,

  PostItem: styled.Pressable`
    padding-bottom: 12px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  MoreButton: styled.Pressable`
    padding: 12px;
    align-items: center;
    background-color: #fbfcfe;
    border-radius: 8px;
  `,
};

interface BoardAccordionProps {
  board: Board;
}

export default function BoardAccordion({board}: BoardAccordionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {data: postsData} = usePostsByBoard(board, 0, 3);
  const posts = postsData?.content || [];

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  const handleMorePress = () => {
    router.push({
      pathname: '/(tabs)/community/board',
      params: {board},
    });
  };

  return (
    <S.Container>
      <S.Header onPress={() => setIsOpen(prev => !prev)}>
        <S.Title>
          <IcPin />
          <AppText textType='B2'>{board}</AppText>
        </S.Title>
        <IcArrowRightS rotation={isOpen ? 270 : 90} />
      </S.Header>

      {isOpen && (
        <S.Content>
          {posts.map(post => (
            <S.PostItem key={post.id} onPress={() => handlePostPress(post.id)}>
              <PostBody
                title={post.title}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
              />
            </S.PostItem>
          ))}
          <S.MoreButton onPress={handleMorePress}>
            <AppText textType='B2Bold' colorType='textMedium'>
              더보기
            </AppText>
          </S.MoreButton>
        </S.Content>
      )}
    </S.Container>
  );
}
