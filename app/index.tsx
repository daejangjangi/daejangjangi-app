import React from 'react';
import CommonTextField from '@/src/common/CommonTextField';
import {Text, View} from 'react-native';
import CommonSearchBar from '@/src/common/CommonSearchBar';
import CommonModal from '@/src/common/CommonModal';
import CommonCheckBox from '@/src/common/CommonCheckBox';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CommonModal subject='관심질환'>
        <CommonCheckBox values={['변비', '치질', '과민성 장 증후군']} />
      </CommonModal>
      {/* <CommonTextField placeholder='텍스트 입력' />
      <CommonSearchBar placeholder='검색' /> */}
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
