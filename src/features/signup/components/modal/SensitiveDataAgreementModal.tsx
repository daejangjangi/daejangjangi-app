import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {SENSITIVE_DATA_AGREEMENT} from '@/src/features/signup/components/modal/agreement-data';
import SignUpModal from '@/src/features/signup/components/layout/SignUpModal';

const S = {
  AgreementBody: styled(AppText)`
    margin-top: 20px;
    color: ${props => props.theme.colors.text};
  `,
};

interface SensitiveDataAgreementModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SensitiveDataAgreementModal({
  isVisible,
  onClose,
}: SensitiveDataAgreementModalProps) {
  return (
    <SignUpModal title='대장장이 개인정보 수집 이용동의' isVisible={isVisible} onClose={onClose}>
      <S.AgreementBody>{SENSITIVE_DATA_AGREEMENT}</S.AgreementBody>
    </SignUpModal>
  );
}
