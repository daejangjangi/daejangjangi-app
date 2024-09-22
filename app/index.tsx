import React, {useState} from 'react';
import CommonTextField from '@/src/common/CommonTextField';
import {Text, View} from 'react-native';
import CommonSearchBar from '@/src/common/CommonSearchBar';
import CommonModal from '@/src/common/CommonModal';
import CommonCheckBox from '@/src/common/CommonCheckBox';

export default function Index() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const values = ['변비', '치질', '과민성 장 증후군'];
  const handleCheckBoxChange = (selectedItems: boolean[]) => {
    setCheckedItems(selectedItems);
    const newSelectedValues = values.filter((_, index) => selectedItems[index]);
    setSelectedValues(newSelectedValues);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CommonModal subject='관심질환'>
        <CommonCheckBox values={values} onChange={handleCheckBoxChange} />
      </CommonModal>
      {/* <CommonTextField placeholder='텍스트 입력' />
      <CommonSearchBar placeholder='검색' /> */}
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
