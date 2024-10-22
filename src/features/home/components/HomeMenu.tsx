import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcArrowRightS, IcCartColor, IcDaejangToon, IcPill, IcRecipe} from '@/assets/images/icons';
import {Image} from 'expo-image';
import {Href, useRouter} from 'expo-router';

const S = {
  Container: styled.View`
    padding: 16px 12px;
    border-radius: 12px;
    gap: 12px;

    background-color: #fff;
  `,

  Line: styled.View`
    margin: 0 auto;

    width: 256px;
    height: 1px;
    background-color: ${props => props.theme.colors.textLight};
  `,

  MenuItem: styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  MenuItemMain: styled.View`
    flex-direction: row;
    gap: 16px;
  `,

  MenuItemImage: styled(Image)`
    width: 40px;
    height: 40px;
    border-radius: 57px;
  `,

  MenuItemTexts: styled.View`
    gap: 6px;
  `,
};

interface HomeMenuItemProps {
  title: string;
  description: string;
  Icon: ReactNode;
  href: Href;
}

function HomeMenuItem({title, description, Icon, href}: HomeMenuItemProps) {
  const router = useRouter();

  return (
    <S.MenuItem onPress={() => router.push(href)}>
      <S.MenuItemMain>
        {Icon}

        <S.MenuItemTexts>
          <AppText textType='C2Bold'>{title}</AppText>
          <AppText textType='C1' colorType='textMedium'>
            {description}
          </AppText>
        </S.MenuItemTexts>
      </S.MenuItemMain>

      <IcArrowRightS />
    </S.MenuItem>
  );
}

const MENU_LIST: HomeMenuItemProps[] = [
  {
    title: '대장툰',
    description: '또양이가 장건강 상식을 쉽게 얘기해요',
    Icon: <IcDaejangToon />,
    href: '/(home)/cartoon',
  },
  {
    title: '레시피 릴스',
    description: '장이 편해지는 식단을 1분 이내에 보여줘요',
    Icon: <IcRecipe />,
    href: '/(home)/reels',
  },
  {
    title: '약 카드뉴스',
    description: '전문인력들이 장관련 약 정보를 알려줘요',
    Icon: <IcPill />,
    href: '/(home)/card-news',
  },
  {
    title: '상품추천 뉴스레터',
    description: '전문인력들이 장건강에 필요한 상품을 추천해요',
    Icon: <IcCartColor />,
    href: '/(home)/news-letter',
  },
];

export default function HomeMenu() {
  return (
    <S.Container>
      <AppText textType='B2Bold'>내 장건강과 한걸음 가까워지기</AppText>
      {MENU_LIST.map(item => (
        <>
          <S.Line />
          <HomeMenuItem key={item.title} {...item} />
        </>
      ))}
    </S.Container>
  );
}
