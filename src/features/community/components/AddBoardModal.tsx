import React, {useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import CommonCheckBox from '@/src/common/CommonCheckBox';
import {Board} from '@/src/api/types/post.type';

const S = {
  Container: styled.View`
    padding: 16px 20px;
    background-color: #fff;
    border-radius: 12px;
    max-height: 80%;
    width: 90%;
    align-self: center;
  `,
  ScrollViewContainer: styled.ScrollView`
    margin-top: 20px;
  `,
  Body: styled.View`
    padding-bottom: 20px;
  `,
  Footer: styled.View`
    margin-top: 20px;
    flex-direction: row;
    gap: 8px;
  `,
  Button: styled.Pressable<{$sub?: boolean}>`
    flex: 1;
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${props =>
      props.$sub ? props.theme.colors.textLight : props.theme.colors.main};
  `,
  ButtonText: styled(AppText)<{$sub?: boolean}>`
    color: ${props => (props.$sub ? props.theme.colors.textMedium : '#fff')};
  `,
};

interface AddBoardModalProps {
  initialBoards: Board[];
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (selectedBoards: Board[]) => void;
}

export default function AddBoardModal({
  initialBoards,
  isVisible,
  onClose,
  onSubmit,
}: AddBoardModalProps) {
  const boardValues = Object.values(Board);
  const [checkedStates, setCheckedStates] = useState<boolean[]>(() =>
    boardValues.map(board => initialBoards?.includes(board)),
  );

  const handleChange = (newCheckedStates: boolean[]) => {
    setCheckedStates(newCheckedStates);
  };

  const handleSubmit = () => {
    const selectedBoards = boardValues.filter((_, index) => checkedStates[index]);
    onSubmit(selectedBoards);
    onClose();
  };

  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <AppText textType='B2'>추가할 게시판 선택</AppText>

        <S.ScrollViewContainer>
          <S.Body>
            <CommonCheckBox
              values={boardValues}
              initialCheckedState={checkedStates}
              onChange={handleChange}
            />
          </S.Body>
        </S.ScrollViewContainer>

        <S.Footer>
          <S.Button $sub onPress={onClose}>
            <S.ButtonText $sub textType='B2'>
              취소
            </S.ButtonText>
          </S.Button>
          <S.Button onPress={handleSubmit}>
            <S.ButtonText textType='B2'>추가하기</S.ButtonText>
          </S.Button>
        </S.Footer>
      </S.Container>
    </Modal>
  );
}
