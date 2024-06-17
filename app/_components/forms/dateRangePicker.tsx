import { useState } from 'react';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Text } from '@chakra-ui/react';

export default function DateRangePicker({ range, setRange, setCurrent }) {
  const initialFooter = (
    <Text fontWeight={500}>Please pick the first day.</Text>
  );
  const [footer, setFooter] = useState(initialFooter);
  return (
    <DayPicker
      showOutsideDays
      pagedNavigation
      mode='range'
      selected={range}
      onSelect={(r) => {
        setRange(r);
        setCurrent(r);

        if (r && r.from && r.to) {
          setFooter(
            <Text fontWeight={500}>
              {format(r.from, 'MMM d')} – {format(r.to, 'MMM d')}
            </Text>
          );
        } else if (r && r.from && !r.to) {
          setFooter(
            <Text fontWeight={500}>
              {format(r.from, 'MMM d')} - Select the last day.
            </Text>
          );
        } else {
          setFooter(initialFooter);
        }
      }}
      footer={footer}
    />
  );
}
