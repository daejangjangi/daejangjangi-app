import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {DISEASES} from '@/src/common/data/health-concerns';
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

const DISEASE_MAPPING: Record<string, string> = {
  변비: '변비',
  치질: '치질',
  '과민성 장 증후군\n(설사 우세형)': '과민성장증후군_설사형',
  '과민성 장 증후군\n(변비 우세형)': '과민성장증후군_변비형',
  치핵: '치핵',
  치루: '치루',
  치열: '치열',
  변실금: '변실금',
  항문소양증: '항문소양증',
  대장암: '대장암',
  크론병: '크론병',
  '궤양성 대장염': '궤양성대장염',
  복부팽만: '복부팽만',
  없음: '없음',
};

const REVERSE_DISEASE_MAPPING = Object.entries(DISEASE_MAPPING).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>,
);

interface EditDiseasesModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentDiseases: string[];
}

export default function EditDiseasesModal({
  isVisible,
  onClose,
  currentDiseases,
}: EditDiseasesModalProps) {
  const {data: memberInfo} = useMemberInfo();
  const {mutate: updateMemberInfo} = useUpdateMemberInfo();

  // 현재 선택된 질환들을 UI 텍스트로 변환
  const initialDiseases = currentDiseases.map(d => REVERSE_DISEASE_MAPPING[d] || d);

  // 체크박스의 초기 상태 설정
  const initialCheckedState = DISEASES.map(disease => initialDiseases.includes(disease));
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

    const selectedDiseases = DISEASES.filter((_, index) => checkedStates[index]);
    const mappedDiseases = selectedDiseases.map(disease => DISEASE_MAPPING[disease]);

    updateMemberInfo(
      {
        ...memberInfo,
        diseases: mappedDiseases,
      },
      {
        onSuccess: () => {
          onClose();
          Alert.alert('알림', '관심질환이 변경되었습니다.');
        },
        onError: (error: any) => {
          console.error('관심질환 변경 실패', error);
          Alert.alert('오류', '관심질환 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <AppText textType='B2'>관심질환</AppText>

        <S.ScrollViewContainer>
          <S.Body>
            <CommonCheckBox
              values={DISEASES}
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
