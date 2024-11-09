import React from 'react';
import {useLocalSearchParams} from 'expo-router';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
  `,

  ContentContainer: styled.View`
    padding: 20px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
  `,

  Title: styled.View`
    gap: 20px;
  `,

  ProfileImage: styled(Image)`
    width: 150px;
    height: 150px;
  `,
};

const TEMP_DATA = {
  title: '그릭요거트',
  subTitle: '그릭요거트 소개',
  description:
    "유산균을 꾸준히 섭취해 건강한 장내 환경을 만들어야 한다는 것은 일반적인 상식이 됐습니다. 요거트와 요구르트를 자주 드시는 분부터 아예 영양제 형태로 프로바이오틱스를 챙겨 드시는 분들도 생겨나고 있습니다. 어떤 방법이 더 효율적인 지는 불분명하나, 꾸준하게 요거트를 즐기시는 분들이 많이 계실텐데요.과민성 장 증후군 환자에겐 일종의 딜레마와도 같은 것이, 요거트를 비롯한 유제품을 섭취하였을 때 프로바이오틱스의 좋은 효과와 함께 유당불내증을 동반한 장 불편감도 따라오지 않을까 하는 두려움입니다.다행이게도 요거트로 인해 유당불내증이 생길 확률은 그리 높지 않습니다.사실 요거트는 우유를 유산균으로 발효시켜 생성된 식품인데요. 발효 과정에서 생겨난 유산균의 효소가 유당을 분해시켜 주기 때문에, 유당을 소화할 수 없는 분들도 편하게 섭취할 수 있는 것입니다. 심지어 유산균은 그 정의가 '포도당이나 유당 등의 탄수화물을 분해해 젖산 등의 유산을 만드는 미생물'이기도 한데요, 유당을 제거하는 데 많은 도움을 주고 있음을 알 수 있죠?그러나 요거트를 드시는 데 여전한 불안함을 갖고 계시다면 그릭 요거트를 시도해보세요.그릭 요거트는 더욱 확실하게 유당의 제거를 보장합니다. 그릭 요거트는 그 공정 과정에서, 발효를 마친 뒤에 저온숙성 후 오랜 시간에 걸쳐 면에 걸러 유청을 제거하는데요. 유청은 70%가 유당으로 구성되어 있는 우유가 엉겨서 응고한 뒤 남은 액체입니다. 그렇기 때문에 그릭 요거트는 유당을 더욱 절감한 요거트인 것이지요.그릭요거트는 그리스 지중해 연안에서부터 전통이 되어 내려오는 발효유로 다이어트 식품으로도 많은 사랑을 받아오곤 했습니다. 일반 요거트에 비해 더 높은 영양성분을 가지고 있으며 불필요한 당류는 줄였기 때문이죠. 요즘에는 그릭요거트의 영양가보다도 꾸덕한 식감을 선호해 즐기시는 분들도 늘어나고 있습니다. 장 내부를 건강한 균들로 채워넣고 싶은 과민성 장 증후군 환자이신가요? 보다 안전하고 편안한 그릭 요거트를 시도해보세요.",
  profileImage: 'https://placehold.co/300',
  category: '유산균',
};

export default function NewsLetterDetailScreen() {
  const {id} = useLocalSearchParams();

  return (
    <S.Container>
      <S.ContentContainer>
        <S.Header>
          <S.Title>
            <AppText textType='T3'>{TEMP_DATA.title}</AppText>
            <AppText textType='B2' colorType='textMedium'>
              {TEMP_DATA.subTitle}
            </AppText>
          </S.Title>

          <S.ProfileImage source={TEMP_DATA.profileImage} />
        </S.Header>

        <AppText textType='B1'>{TEMP_DATA.description}</AppText>
      </S.ContentContainer>
    </S.Container>
  );
}
