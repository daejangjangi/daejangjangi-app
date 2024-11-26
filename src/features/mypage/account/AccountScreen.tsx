import React, {useState} from 'react';
import styled from 'styled-components/native';
import MyPageMenuItem from '@/src/features/mypage/components/MyPageMenuItem';
import MyPageQuestionModal from '@/src/features/mypage/account/modal/MyPageQuestionModal';
import {useAuthStore} from '@/src/stores/auth';
import {useRouter} from 'expo-router';
import {MemberApi} from '@/src/api/member.api';
import messaging from '@react-native-firebase/messaging';
import {FcmApi} from '@/src/api/fcm.api';
const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  Menu: styled.View`
    padding: 24px 20px;
  `,
};

type ModalType = 'logout' | 'exit' | 'exitComplete';

export default function AccountScreen() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [exitCompleteModalOpen, setExitCompleteModalOpen] = useState(false);

  const router = useRouter();
  const {clearTokens} = useAuthStore();

  const handleLogout = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await FcmApi.deleteFcmToken(fcmToken);
    }
    clearTokens();
    router.replace('/auth/signin');
    setLogoutModalOpen(false);
  };

  const handleExit = async () => {
    try {
      await MemberApi.deleteMember();

      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await FcmApi.deleteFcmToken(fcmToken);
      }

      setExitModalOpen(false);
      setExitCompleteModalOpen(true);

      clearTokens();
      router.replace('/auth/signin');
    } catch (err) {
      console.error(err);
    }
  };

  const handleExitComplete = () => {
    setExitCompleteModalOpen(false);
  };

  const handleModalOpen = (target: ModalType) => {
    if (target === 'logout') {
      setLogoutModalOpen(true);
    } else if (target === 'exit') {
      setExitModalOpen(true);
    } else if (target === 'exitComplete') {
      setExitCompleteModalOpen(true);
    }
  };
  const handleModalClose = (target: ModalType) => {
    if (target === 'logout') {
      setLogoutModalOpen(false);
    } else if (target === 'exit') {
      setExitModalOpen(false);
    } else if (target === 'exitComplete') {
      setExitCompleteModalOpen(false);
    }
  };

  return (
    <>
      <S.Container>
        <S.Menu>
          <MyPageMenuItem Icon={null} title='로그아웃' onPress={() => handleModalOpen('logout')} />
          <MyPageMenuItem Icon={null} title='회원탈퇴' onPress={() => handleModalOpen('exit')} />
        </S.Menu>
      </S.Container>

      <MyPageQuestionModal
        isVisible={logoutModalOpen}
        onClose={() => handleModalClose('logout')}
        onConfirm={() => handleLogout()}
        title='로그아웃 하시겠습니까?'
        body='회원 정보는 그대로 유지됩니다.'
      />
      <MyPageQuestionModal
        isVisible={exitModalOpen}
        onClose={() => handleModalClose('exit')}
        onConfirm={() => handleExit()}
        title='회원탈퇴 하시겠습니까?'
        body='회원탈퇴 시 모든 정보가 삭제됩니다.'
      />
      <MyPageQuestionModal
        isVisible={exitCompleteModalOpen}
        onConfirm={() => handleExitComplete()}
        title='회원탈퇴 되었습니다.'
        body='그동안 이용해주셔서 감사합니다.'
      />
    </>
  );
}
