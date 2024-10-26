import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {AppText} from '@/src/common/AppComponents';
import {IcEye, IcHeartColorEmpty} from '@/assets/images/icons';

const S = {
  Container: styled.Pressable`
    padding: 20px 0;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  PreviewImage: styled(Image)`
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.textLight};
  `,

  Description: styled.View`
    justify-content: center;
    gap: 4px;
  `,

  SubInfosContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  SubInfo: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,
};

interface CartoonListItemProps {
  episode: number;
  title: string;
  viewCount: number;
  likeCount: number;
  previewImageUrl: string;
}

export default function CartoonListItem({
  episode,
  title,
  viewCount,
  likeCount,
  previewImageUrl,
}: CartoonListItemProps) {
  return (
    <S.Container>
      <S.PreviewImage source={previewImageUrl} />

      <S.Description>
        <AppText>
          [{episode}화] {title}
        </AppText>

        <S.SubInfosContainer>
          <S.SubInfo>
            <IcEye />
            <AppText textType='C1' colorType='textMedium'>
              {viewCount}
            </AppText>
          </S.SubInfo>

          <S.SubInfo>
            <IcHeartColorEmpty />
            <AppText textType='C1' colorType='main'>
              {likeCount}
            </AppText>
          </S.SubInfo>
        </S.SubInfosContainer>
      </S.Description>
    </S.Container>
  );
}
