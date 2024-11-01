import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcAdd} from '@/assets/images/icons';
import BoardAccordion from './BoardAccordion';

const S = {
  Container: styled.View`
    padding: 16px;
  `,

  Title: styled(AppText)`
    margin-bottom: 16px;
  `,

  BoardList: styled.View`
    gap: 8px;
    background-color: #fff;
    border: 1px solid ${props => props.theme.colors.textLight};
    border-radius: 8px;
    padding: 8px 12px;
  `,

  AddBoard: styled.Pressable`
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
    gap: 4px;
  `,
};

const TEMP_POSTS = [
  {
    id: 1,
    title: '쾌변 부르는 생활습관',
    content:
      '식습관은 장의 운동에 큰 영향을 미친다. 특히 쇠고기, 돼지고기, 닭고기 등 육류를 지나치게 많이 먹으면 변비가...',
    likes: 16,
    comments: 4,
    views: 112,
  },
  {
    id: 2,
    title: '쾌변 부르는 생활습관',
    content:
      '식습관은 장의 운동에 큰 영향을 미친다. 특히 쇠고기, 돼지고기, 닭고기 등 육류를 지나치게 많이 먹으면 변비가...',
    likes: 16,
    comments: 4,
    views: 112,
  },
  {
    id: 3,
    title: '쾌변 부르는 생활습관',
    content:
      '식습관은 장의 운동에 큰 영향을 미친다. 특히 쇠고기, 돼지고기, 닭고기 등 육류를 지나치게 많이 ���으면 변비가...',
    likes: 16,
    comments: 4,
    views: 112,
  },
];

const BOARD_CATEGORIES = [
  {
    id: 'free',
    title: '자유주제',
    posts: TEMP_POSTS,
    isUnread: true,
  },
  {
    id: 'news',
    title: '대장내시경',
    posts: TEMP_POSTS,
    isUnread: false,
  },
  {
    id: 'qna',
    title: '변비',
    posts: TEMP_POSTS,
    isUnread: false,
  },
];

export default function BoardPosts() {
  // @TODO: 게시글 데이터 조회
  // @TODO: 게시글 상세 페이지 이동
  const handlePostPress = (postId: number) => {
    // router.push(`/(tabs)/community/post/${postId}`);
  };

  const handleMorePress = () => {
    // @TODO: 게시판 더보기 페이지 이동
  };

  return (
    <S.Container>
      <S.Title textType='T1'>대장항문 게시판</S.Title>
      <S.BoardList>
        {BOARD_CATEGORIES.map(category => (
          <BoardAccordion
            key={category.id}
            title={category.title}
            posts={category.posts}
            isUnread={category.isUnread}
            onPostPress={handlePostPress}
            onMorePress={handleMorePress}
          />
        ))}
        <S.AddBoard>
          <IcAdd />
          <AppText textType='B2' colorType='textMedium'>
            게시판 추가하기
          </AppText>
        </S.AddBoard>
      </S.BoardList>
    </S.Container>
  );
}
