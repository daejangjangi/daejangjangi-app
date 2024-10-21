import React, {useEffect, useState} from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {IcCheckboxChecked, IcCheckboxUnchecked} from '@/assets/images/icons';
import {useSignUpStore} from '@/src/stores';
import PersonalDataAgreementModal from '@/src/features/signup/components/modal/PersonalDataAgreementModal';
import {Pressable} from 'react-native';
import SensitiveDataAgreementModal from '@/src/features/signup/components/modal/SensitiveDataAgreementModal';

const S = {
  Container: styled.View``,

  Body: styled.View`
    margin-top: 139px;
  `,
  Description: styled(AppText)``,

  Options: styled.View`
    gap: 12px;
    margin-top: 37px;
  `,

  Checkbox: styled.Pressable`
    justify-items: center;
    align-items: center;
  `,

  OptionContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  OptionMain: styled.View`
    flex-direction: row;
    align-items: center;

    gap: 12px;
  `,

  OptionTitle: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  OptionDetailText: styled(AppText)`
    color: ${props => props.theme.colors.main};
  `,
};

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

function Checkbox({checked, onPress}: CheckboxProps) {
  return (
    <S.Checkbox onPress={onPress}>
      {checked ? <IcCheckboxChecked /> : <IcCheckboxUnchecked />}
    </S.Checkbox>
  );
}

interface OptionProps {
  title: string;
  checked: boolean;
  onToggle: () => void;

  bold?: boolean;
  hasDetail?: boolean;
  onClickDetail?: () => void;
}

function Option({title, checked, onToggle, bold, hasDetail, onClickDetail}: OptionProps) {
  const textType = bold ? 'B2Bold' : 'B1';

  return (
    <S.OptionContainer>
      <S.OptionMain>
        <Checkbox checked={checked} onPress={() => onToggle()} />
        <S.OptionTitle textType={textType}>{title}</S.OptionTitle>
      </S.OptionMain>

      {hasDetail && onClickDetail && (
        <Pressable onPress={() => onClickDetail()}>
          <S.OptionDetailText textType='B1'>보기</S.OptionDetailText>
        </Pressable>
      )}
    </S.OptionContainer>
  );
}

export default function SignUpTermsOfService() {
  const {termsOfService, updateTermsOfService} = useSignUpStore(state => state);
  const [allChecked, setAllChecked] = useState(Object.values(termsOfService).every(v => v));
  const [modalOpen, setModalOpen] = useState({
    termsOfService: false,
    sensitiveData: false,
  });

  const toggleModal = (target: string) => {
    setModalOpen(prev => ({
      ...prev,
      [target]: !prev[target],
    }));
  };

  const handleAllToggle = () => {
    const target = !allChecked;

    Object.entries(termsOfService).forEach(([key, value]) => {
      if (value !== target) {
        updateTermsOfService(key);
      }
    });
    setAllChecked(prev => !prev);
  };

  useEffect(() => {
    const all = Object.values(termsOfService).every(v => v);
    if (!all) {
      setAllChecked(false);
    }
  }, [termsOfService]);

  return (
    <>
      <S.Container>
        <S.Body>
          <S.Description textType='T3'>
            대장장이 이용을 위해{'\n'}약관에 동의해주세요.
          </S.Description>

          <S.Options>
            <Option title='전체동의' bold checked={allChecked} onToggle={() => handleAllToggle()} />
            <Option
              title='[필수] 만 14세 이상입니다.'
              checked={termsOfService.isOver14}
              onToggle={() => updateTermsOfService('isOver14')}
            />
            <Option
              title='[필수] 대장장이 이용약관'
              checked={termsOfService.termsOfServiceAgreement}
              onToggle={() => updateTermsOfService('termsOfServiceAgreement')}
            />
            <Option
              title='[필수] 개인정보 수집 및 이용 동의'
              checked={termsOfService.personalDataAgreement}
              onToggle={() => updateTermsOfService('personalDataAgreement')}
              hasDetail
              onClickDetail={() => toggleModal('termsOfService')}
            />
            <Option
              title='[필수] 민감정보 수집 및 이용 동의'
              checked={termsOfService.sensitiveDataAgreement}
              onToggle={() => updateTermsOfService('sensitiveDataAgreement')}
              hasDetail
              onClickDetail={() => toggleModal('sensitiveData')}
            />
            <Option
              title='[선택] 이벤트/홍보성 정보 수신 동의'
              checked={termsOfService.promotionalInfoAgreement}
              onToggle={() => updateTermsOfService('promotionalInfoAgreement')}
            />
          </S.Options>
        </S.Body>
      </S.Container>

      <PersonalDataAgreementModal
        isVisible={modalOpen.termsOfService}
        onClose={() => toggleModal('termsOfService')}
      />
      <SensitiveDataAgreementModal
        isVisible={modalOpen.sensitiveData}
        onClose={() => toggleModal('sensitiveData')}
      />
    </>
  );
}
