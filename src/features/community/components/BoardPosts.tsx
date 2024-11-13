import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcAdd} from '@/assets/images/icons';
import {usePinnedBoards, useUpdatePinnedBoards} from '@/src/hooks/queries/board';
import {Board} from '@/src/api/types/post.type';
import BoardAccordion from './BoardAccordion';
import AddBoardModal from './AddBoardModal';

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

export default function BoardPosts() {
  const {mutate: updatePinnedBoards} = useUpdatePinnedBoards();
  const {data: pinnedBoardsData} = usePinnedBoards();
  const pinnedBoards =
    pinnedBoardsData?.pinnedBoards?.filter((board, index, self) => self.indexOf(board) === index) ||
    [];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddBoard = (selectedBoards: Board[]) => {
    updatePinnedBoards(selectedBoards);
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <S.Container>
      <S.Title textType='T1'>대장항문 게시판</S.Title>
      <S.BoardList>
        {pinnedBoards.map(board => (
          <BoardAccordion key={board} board={board} />
        ))}
        <S.AddBoard onPress={handleOpenModal}>
          <IcAdd />
          <AppText textType='B2' colorType='textMedium'>
            게시판 추가하기
          </AppText>
        </S.AddBoard>
      </S.BoardList>

      {isModalVisible && (
        <AddBoardModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddBoard}
          initialBoards={pinnedBoards}
        />
      )}
    </S.Container>
  );
}
