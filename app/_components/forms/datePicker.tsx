import { useState } from 'react';
import { format, getUnixTime } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Text } from '@chakra-ui/react';

export default function DatePicker({ date, setDate, setCurrent }) {
  return (
    <DayPicker
      mode='single'
      selected={date}
      onSelect={(date) => {
        setDate(date);
        setCurrent(date);
      }}
    />
  );
}
