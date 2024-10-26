import React, {useState} from 'react';
import styled from 'styled-components/native';
import {LinearGradient} from 'expo-linear-gradient';
import {Image} from 'expo-image';
import {AppText} from '@/src/common/AppComponents';
import {IcHeartColorEmpty} from '@/assets/images/icons';

const S = {
  Container: styled(LinearGradient)`
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 124px;
    overflow: visible;
  `,

  Content: styled.View`
    border-radius: 12px;
  `,

  Description: styled.View`
    flex-direction: row;
    padding: 8px 12px;
    gap: 8px;

    background-color: ${props => props.theme.colors.textLight};
  `,

  NewBadge: styled(AppText)`
    padding: 4px 6px;
    font-size: 11px;
    font-family: Pretendard-Medium;
  `,

  DescriptionRight: styled.View`
    gap: 4px;
  `,

  LikeContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,
};

export default function NewCartoonPreview() {
  const [previewInfo, setPreviewInfo] = useState({
    title: '치핵이치핵이뭔데ㅋ',
    likeCount: 120,
    writer: '정수아',
    imageUrl: 'https://placehold.co/200',
  });

  return (
    <S.Container colors={['rgba(244, 15, 84, 1)', 'rgba(255, 163, 208, 1)']}>
      <S.Content>
        <Image source={previewInfo.imageUrl} />

        <S.Description>
          <S.NewBadge colorType='main'>신규</S.NewBadge>

          <S.DescriptionRight>
            <AppText textType='B2Bold'>{previewInfo.title}</AppText>

            <S.LikeContainer>
              <IcHeartColorEmpty />
              <AppText textType='C1' colorType='main'>
                {previewInfo.likeCount}
              </AppText>
            </S.LikeContainer>
          </S.DescriptionRight>
        </S.Description>
      </S.Content>
    </S.Container>
  );
}
