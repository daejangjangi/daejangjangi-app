import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import {getTimeAgo} from '@/src/utils/date';
import {
  IcHeartColorEmpty,
  IcHeartColor,
  IcSpeechBubble,
  IcEye,
  IcSend,
  IcKebab,
} from '@/assets/images/icons';
import {
  useCreateComment,
  useDeletePost,
  useLikeComment,
  useLikePost,
  usePostDetail,
  useDeleteComment,
} from '@/src/hooks/queries/post';
import {Alert} from 'react-native';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
  `,

  Header: styled.View`
    flex-direction: row;
    padding: 12px 20px;
    align-items: flex-start;
    justify-content: space-between;
  `,

  HeaderLeft: styled.View`
    flex-direction: row;
    gap: 12px;
  `,

  UserInfo: styled.View`
    margin-bottom: 4px;
  `,

  Avatar: styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #eee;
  `,

  Nickname: styled(AppText)``,

  Time: styled(AppText)``,

  Content: styled.View`
    padding: 12px 20px;
  `,

  Title: styled(AppText)`
    margin-bottom: 16px;
  `,

  Text: styled(AppText)``,

  Stats: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 12px 20px;
  `,

  StatItem: styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,

  CommentInput: styled.View`
    background-color: #fbfcfe;
    padding: 12px 20px;
  `,

  InputContainer: styled.View`
    flex-direction: row;
    align-items: flex-end;
    background-color: #fff;
    border: 1px solid ${props => props.theme.colors.textMedium};
    border-radius: 8px;
    padding-right: 12px;
    min-height: 48px;
  `,

  Input: styled.TextInput`
    flex: 1;
    padding: 12px 16px;
    max-height: 100px;
    text-align-vertical: center;
  `,

  SendButton: styled.Pressable`
    padding: 4px;
    margin-bottom: 12px;
  `,

  CommentsContainer: styled.View`
    padding: 20px;
    background-color: #fbfcfe;
  `,

  CommentCount: styled(AppText)`
    margin-bottom: 16px;
  `,

  CommentItem: styled.View`
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 12px;
  `,

  CommentHeader: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  `,

  CommentUserInfo: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  CommentExtraInfo: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  CommentAvatar: styled.View`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #eee;
  `,

  Divider: styled.View`
    height: 8px;
    background-color: #fbfcfe;
  `,

  CommentFooter: styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
  `,

  CommentLikeButton: styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  KebabButton: styled.Pressable`
    padding: 4px;
  `,

  MenuModal: styled.View`
    position: absolute;
    right: 8px;
    top: 40px;
    background-color: white;
    border-radius: 8px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
  `,

  MenuItem: styled.TouchableOpacity`
    justify-content: center;
    align-items: center;

    padding: 12px 16px;
  `,

  MenuDivider: styled.View`
    height: 1px;
    background-color: ${props => props.theme.colors.borderLight};
  `,
};

// Comment 컴포넌트
function Comment({
  id,
  nickname,
  content,
  createdAt,
  likes,
  liked,
  isAuthor,
}: {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  isAuthor: boolean;
}) {
  const {mutate: likeComment} = useLikeComment();
  const {mutate: deleteComment} = useDeleteComment();
  const timeAgo = getTimeAgo(createdAt);
  const [showMenu, setShowMenu] = useState(false);

  const handleLikePress = () => {
    likeComment(id);
  };

  const handleKebabPress = () => {
    setShowMenu(prev => !prev);
  };

  const handleDeleteComment = () => {
    Alert.alert('댓글 삭제', '정말로 이 댓글을 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          deleteComment(id);
          setShowMenu(false);
        },
      },
    ]);
  };

  return (
    <S.CommentItem>
      <S.CommentHeader>
        <S.CommentUserInfo>
          <S.CommentAvatar />
          <AppText textType='B1'>{nickname}</AppText>
        </S.CommentUserInfo>

        <S.CommentExtraInfo>
          <AppText textType='C1' colorType='textMedium'>
            {timeAgo}
          </AppText>
          {isAuthor && (
            <>
              <S.KebabButton onPress={handleKebabPress}>
                <IcKebab />
              </S.KebabButton>
              {showMenu && (
                <S.MenuModal>
                  <S.MenuItem onPress={handleDeleteComment}>
                    <AppText textType='B1'>댓글 삭제</AppText>
                  </S.MenuItem>
                </S.MenuModal>
              )}
            </>
          )}
        </S.CommentExtraInfo>
      </S.CommentHeader>
      <AppText textType='C2'>{content}</AppText>
      <S.CommentFooter>
        <S.CommentLikeButton onPress={handleLikePress}>
          {liked ? <IcHeartColor /> : <IcHeartColorEmpty />}
          <AppText textType='C1' colorType={liked ? 'main' : 'textMedium'}>
            {likes}
          </AppText>
        </S.CommentLikeButton>
      </S.CommentFooter>
    </S.CommentItem>
  );
}

// @TODO: 실제 데이터 연동 필요
export default function PostScreen() {
  const router = useRouter();

  const {id: postId} = useLocalSearchParams<{id: string}>();
  const {data: post} = usePostDetail(Number(postId));
  const {mutate: createComment} = useCreateComment();
  const {mutate: likePost} = useLikePost();
  const {mutate: deletePost} = useDeletePost();

  const [comment, setComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  if (!post) return null;

  const timeAgo = getTimeAgo(post.createdAt);

  const handlePostLikePress = () => {
    likePost(Number(postId));
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      createComment({postId: Number(postId), content: comment, parentCommentId: null});
      setComment('');
    }
  };

  const handleKebabPress = () => {
    setShowMenu(prev => !prev);
  };

  const handleEditPost = () => {
    router.push({
      pathname: '/(tabs)/community/write',
      params: {
        id: postId,
        title: post.title,
        content: post.content,
        boards: JSON.stringify(post.boards),
      },
    });
    setShowMenu(false);
  };

  const handleDeletePost = () => {
    Alert.alert('게시글 삭제', '정말로 이 게시글을 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          deletePost(Number(postId));
          router.back();
        },
      },
    ]);
    setShowMenu(false);
  };

  return (
    <>
      <S.Container>
        <S.Header>
          <S.HeaderLeft>
            <S.Avatar />
            <S.UserInfo>
              <S.Nickname textType='B1'>{post.nickname}</S.Nickname>
              <S.Time textType='C1' colorType='textMedium'>
                {timeAgo}
              </S.Time>
            </S.UserInfo>
          </S.HeaderLeft>

          {post.isAuthor && (
            <>
              <S.KebabButton onPress={handleKebabPress}>
                <IcKebab />
              </S.KebabButton>
              {showMenu && (
                <S.MenuModal>
                  <S.MenuItem onPress={handleEditPost}>
                    <AppText textType='B1'>게시글 수정</AppText>
                  </S.MenuItem>
                  <S.MenuDivider />
                  <S.MenuItem onPress={handleDeletePost}>
                    <AppText textType='B1'>게시글 삭제</AppText>
                  </S.MenuItem>
                </S.MenuModal>
              )}
            </>
          )}
        </S.Header>

        <S.Content>
          <S.Title textType='T1'>{post.title}</S.Title>
          <S.Text textType='B1'>{post.content}</S.Text>
        </S.Content>

        <S.Stats>
          <S.StatItem>
            <IcSpeechBubble />
            <AppText textType='C1' colorType='textMedium'>
              {post.comments}
            </AppText>
          </S.StatItem>
          <S.StatItem onPress={handlePostLikePress}>
            {post.isLiked ? <IcHeartColor /> : <IcHeartColorEmpty />}
            <AppText textType='C1' colorType={post.isLiked ? 'main' : 'textMedium'}>
              {post.likes}
            </AppText>
          </S.StatItem>
          <S.StatItem>
            <IcEye />
            <AppText textType='C1' colorType='textMedium'>
              {post.views}
            </AppText>
          </S.StatItem>
        </S.Stats>

        <S.Divider />

        <S.CommentsContainer>
          <S.CommentCount textType='B2'>댓글 {post.commentInfo.length}</S.CommentCount>
          {post.commentInfo.map(c => (
            <Comment
              key={c.id}
              id={c.id}
              nickname={c.nickname}
              content={c.content}
              createdAt={c.createdAt}
              likes={c.likes}
              liked={c.liked}
              isAuthor={c.author}
            />
          ))}
        </S.CommentsContainer>
      </S.Container>

      <S.CommentInput>
        <S.InputContainer>
          <S.Input
            placeholder='댓글을 남겨보세요 :)'
            multiline
            value={comment}
            onChangeText={setComment}
            textAlignVertical='top'
          />
          <S.SendButton onPress={handleSendComment}>
            <IcSend />
          </S.SendButton>
        </S.InputContainer>
      </S.CommentInput>
    </>
  );
}
