import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {CATEGORIES} from '@/src/common/data/health-concerns';
import CommonCheckBox from '@/src/common/CommonCheckBox';
import {useUpdateMemberInfo, useMemberInfo} from '@/src/hooks/queries/member';
import {Alert} from 'react-native';

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

const CATEGORY_MAPPING: Record<string, string> = {
  유산균: '유산균',
  식이섬유: '식이섬유',
  저포드맵: '저포드맵',
  간식: '간식',
  비건: '비건',
  욕실용품: '욕실용품',
  아동: '아동',
  운동기구: '운동기구',
};

const REVERSE_CATEGORY_MAPPING = Object.entries(CATEGORY_MAPPING).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>,
);

interface EditCategoriesModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentCategories: string[];
}

export default function EditCategoriesModal({
  isVisible,
  onClose,
  currentCategories,
}: EditCategoriesModalProps) {
  const {data: memberInfo} = useMemberInfo();
  const {mutate: updateMemberInfo} = useUpdateMemberInfo();

  // 현재 선택된 카테고리들을 UI 텍스트로 변환
  const initialCategories = currentCategories.map(c => REVERSE_CATEGORY_MAPPING[c] || c);

  // 체크박스의 초기 상태 설정
  const initialCheckedState = CATEGORIES.map(category => initialCategories.includes(category));
  const [checkedStates, setCheckedStates] = useState<boolean[]>(initialCheckedState);

  // 모달이 열릴 때만 초기 상태로 리셋
  useEffect(() => {
    if (isVisible) {
      setCheckedStates(initialCheckedState);
    }
  }, [isVisible]);

  const handleChange = (newCheckedStates: boolean[]) => {
    setCheckedStates(newCheckedStates);
  };

  const handleSubmit = () => {
    if (!memberInfo) return;

    const selectedCategories = CATEGORIES.filter((_, index) => checkedStates[index]);
    const mappedCategories = selectedCategories.map(category => CATEGORY_MAPPING[category]);

    updateMemberInfo(
      {
        ...memberInfo,
        categories: mappedCategories,
      },
      {
        onSuccess: () => {
          onClose();
          Alert.alert('알림', '관심상품이 변경되었습니다.');
        },
        onError: (error: any) => {
          console.error('관심상품 변경 실패', error);
          Alert.alert('오류', '관심상품 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <AppText textType='B2'>관심상품</AppText>

        <S.ScrollViewContainer>
          <S.Body>
            <CommonCheckBox
              values={CATEGORIES}
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
            <S.ButtonText textType='B2'>저장</S.ButtonText>
          </S.Button>
        </S.Footer>
      </S.Container>
    </Modal>
  );
}
