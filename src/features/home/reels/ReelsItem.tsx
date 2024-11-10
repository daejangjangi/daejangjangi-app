import React from 'react';
import {Reels} from '@/src/api/types/reels.type';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import Video from 'react-native-video';

const S = {
  Container: styled.View`
    flex: 1;
  `,

  VideoContainer: styled.View`
    padding: 0 16px;
    aspect-ratio: 9/16;
  `,

  Video: styled(Video)`
    flex: 1;
  `,

  Title: styled(AppText)`
    padding: 16px;
  `,
};

interface ReelsItemProps {
  item: Reels;
}

export default function ReelsItem({item}: ReelsItemProps) {
  return (
    <S.Container>
      <S.Title textType='B2'>{item.title}</S.Title>
      <S.VideoContainer>
        <S.Video
          source={{uri: item.reelsVideo}}
          resizeMode='cover'
          repeat
          muted={false}
          controls
          // 에러 핸들링
          onError={error => console.error('Video Error:', error)}
          // 버퍼링 상태 처리
          onBuffer={({isBuffering}) => {
            console.log('Buffering:', isBuffering);
          }}
        />
      </S.VideoContainer>
    </S.Container>
  );
}
