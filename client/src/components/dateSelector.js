import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function DateSelector() {
  const [date, onChange] = useState(new Date());
  return (
    <>
      <div className="h-60 w-60">
        <Calendar
          onChange={onChange}
          showWeekNumbers
          value={date}
        />
      </div>

      <div>
        {`Selected Date: ${date}`}
      </div>
    </>

  );
}
