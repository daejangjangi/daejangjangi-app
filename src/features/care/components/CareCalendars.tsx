import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import styled from 'styled-components/native';
import {format} from 'date-fns';
import {AppText} from '@/src/common/AppComponents';
import {IcNext} from '@/assets/images/icons';
import '@/src/lib/calendar';
import {theme} from '@/src/styles/theme';

const S = {
  Calendar: styled(Calendar)`
    border-radius: 8px;
  `,

  HeaderContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  `,

  ArrowButton: styled.TouchableOpacity`
    padding: 10px;
  `,
};

export default function CareCalendars() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  return (
    <S.Calendar
      onDayPress={handleDayPress}
      current={selectedDate}
      markedDates={{
        [selectedDate]: {selected: true, disableTouchEvent: true},
      }}
      theme={{
        selectedDayBackgroundColor: theme.colors.mainLight,
        selectedDayTextColor: '#000',
        todayTextColor: theme.colors.main,
        arrowColor: theme.colors.text,
      }}
      maxDate={today}
    />
  );
}
