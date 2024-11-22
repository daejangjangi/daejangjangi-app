import React from 'react';
import {
  IcCookie,
  IcDaejangjangi,
  IcGrain,
  IcGreenHeart,
  IcProbiotics,
  IcYellowSmile,
} from '@/assets/images/icons';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;
  `,

  Item: styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,

  ItemText: styled(AppText)`
    font-size: 13px;
  `,
};

interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

function CategoryItem({icon, label, onPress}: CategoryItemProps) {
  return (
    <S.Item onPress={onPress}>
      {icon}
      <S.ItemText textType='B2Bold'>{label}</S.ItemText>
    </S.Item>
  );
}

export default function CategoryHeader() {
  return (
    <S.Container>
      <CategoryItem
        icon={<IcDaejangjangi width={32} height={32} />}
        label='인기상품'
        onPress={() => console.log('인기상품 클릭')}
      />
      <CategoryItem
        icon={<IcProbiotics width={32} height={32} />}
        label='유산균'
        onPress={() => console.log('인기상품 클릭')}
      />
      <CategoryItem
        icon={<IcYellowSmile width={32} height={32} />}
        label='저포드맵'
        onPress={() => console.log('인기상품 클릭')}
      />
      <CategoryItem
        icon={<IcGreenHeart width={32} height={32} />}
        label='생활/리빙'
        onPress={() => console.log('인기상품 클릭')}
      />
      <CategoryItem
        icon={<IcGrain width={32} height={32} />}
        label='식이섬유'
        onPress={() => console.log('인기상품 클릭')}
      />
      <CategoryItem
        icon={<IcCookie width={32} height={32} />}
        label='간식'
        onPress={() => console.log('인기상품 클릭')}
      />
    </S.Container>
  );
}
