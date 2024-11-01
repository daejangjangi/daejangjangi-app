import React, {useState} from 'react';
import {useMemberInfo, useUpdateMemberInfo} from '@/src/hooks/queries/member';
import {Pressable, Alert} from 'react-native';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcPencil} from '@/assets/images/icons';
import EditNicknameModal from './components/EditNicknameModal';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: white;
  `,
  ProfileImage: styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #f0f0f0;
    margin: 20px;
    align-self: center;
  `,
  Section: styled.View`
    padding: 0 20px;
  `,
  Row: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom-width: 1px;
    border-bottom-color: #f0f0f0;
  `,
  Text: styled(AppText)``,
  SectionTitle: styled(AppText)`
    margin-top: 20px;
    margin-bottom: 5px;
  `,
};

interface ProfileItemProps {
  title: string;
  value: string | string[];
  editable?: boolean;
  onEdit?: () => void;
}

function ProfileItem({title, value, editable = false, onEdit}: ProfileItemProps) {
  return (
    <>
      <S.SectionTitle textType='B1' colorType='textMedium'>
        {title}
      </S.SectionTitle>
      <S.Row>
        <S.Text textType='B2'>{Array.isArray(value) ? value.join(', ') : value}</S.Text>
        {editable && (
          <Pressable onPress={onEdit}>
            <IcPencil width={20} height={20} />
          </Pressable>
        )}
      </S.Row>
    </>
  );
}

export default function ProfileScreen() {
  const {data: memberInfo} = useMemberInfo();
  const [isNicknameModalVisible, setIsNicknameModalVisible] = useState(false);

  const profileItems: (ProfileItemProps & {id: string})[] = [
    {
      id: 'nickname',
      title: '닉네임',
      value: memberInfo?.nickname || '',
      editable: true,
      onEdit: () => setIsNicknameModalVisible(true),
    },
    {id: 'birth', title: '생년월일', value: memberInfo?.birth || '', editable: true},
    {id: 'gender', title: '성별', value: memberInfo?.gender === 'm' ? '남성' : '여성'},
    {id: 'diseases', title: '관심질환', value: memberInfo?.diseases || [], editable: true},
    {id: 'categories', title: '관심상품', value: memberInfo?.categories || [], editable: true},
  ];

  return (
    <S.Container>
      <S.ProfileImage />
      <S.Section>
        {profileItems.map(item => (
          <ProfileItem key={item.id} {...item} />
        ))}
      </S.Section>

      <EditNicknameModal
        isVisible={isNicknameModalVisible}
        onClose={() => setIsNicknameModalVisible(false)}
        currentNickname={memberInfo?.nickname || ''}
      />
    </S.Container>
  );
}
