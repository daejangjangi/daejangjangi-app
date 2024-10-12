import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {PERSONAL_DATA_AGREEMENT} from '@/src/features/signup/components/modal/agreement-data';
import SignUpModal from '@/src/features/signup/components/layout/SignUpModal';

const S = {
  AgreementTitle: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  AgreementBody: styled(AppText)`
    margin-top: 20px;
    color: ${props => props.theme.colors.text};
  `,
};

interface PersonalDataAgreementModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function PersonalDataAgreementModal({
  isVisible,
  onClose,
}: PersonalDataAgreementModalProps) {
  return (
    <SignUpModal title='대장장이 개인정보 수집 이용동의' isVisible={isVisible} onClose={onClose}>
      {PERSONAL_DATA_AGREEMENT.map(v => (
        <>
          <S.AgreementTitle textType='C2Bold'>{`${v.order}. ${v.title}`}</S.AgreementTitle>
          <S.AgreementBody>
            {v.content}
            {'\n'}
          </S.AgreementBody>
        </>
      ))}
    </SignUpModal>
  );
}
