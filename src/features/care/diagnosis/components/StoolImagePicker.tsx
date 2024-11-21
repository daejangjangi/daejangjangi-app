import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {AppText} from '@/src/common/AppComponents';
import * as ImagePicker from 'expo-image-picker';
import defaultImage from '@/assets/images/image_input.png';
import {IcXmark} from '@/assets/images/icons';

const S = {
  Container: styled.View`
    width: 100%;
    padding: 24px 20px;
    background-color: #fbfbfe;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.textLight};
  `,

  ImagePickerButton: styled.Pressable`
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 8px;
  `,

  Image: styled(Image)`
    width: 100%;
    height: 100%;
    border-radius: 8px;
  `,

  Description: styled(AppText)`
    padding: 0 20px;
    margin-top: 28px;
  `,

  DeleteButton: styled.Pressable`
    background-color: rgba(45, 53, 65, 0.6);
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
  `,
};

interface StoolImagePickerProps {
  image: string | null;
  onChangeImage: (image: string | null) => void;
}

export default function StoolImagePicker({image, onChangeImage}: StoolImagePickerProps) {
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    if (!result.canceled) {
      onChangeImage(result.assets[0].uri);
    }
  };

  return (
    <S.Container>
      <S.ImagePickerButton onPress={handlePickImage}>
        <S.Image source={image ?? defaultImage} />
        {image && (
          <S.DeleteButton onPress={() => onChangeImage(null)}>
            <IcXmark width={12} height={12} color='#fff' />
          </S.DeleteButton>
        )}
      </S.ImagePickerButton>

      <S.Description textType='C2' colorType='textMedium'>
        * 기저귀 안에 있는 아이의 대변이 전부 보이는 상태에서 찍어주세요.
      </S.Description>
    </S.Container>
  );
}
