import React from 'react';
import {Calendar} from 'react-native-calendars';
import styled from 'styled-components/native';
import {format} from 'date-fns';
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

interface CareCalendarsProps {
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
}

export default function CareCalendars({selectedDate, onChangeDate}: CareCalendarsProps) {
  const date = format(selectedDate, 'yyyy-MM-dd');
  const today = format(new Date(), 'yyyy-MM-dd');

  const handleDayPress = day => {
    onChangeDate(new Date(day.dateString));
  };

  return (
    <S.Calendar
      onDayPress={handleDayPress}
      current={date}
      markedDates={{
        [date]: {selected: true, disableTouchEvent: true},
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
