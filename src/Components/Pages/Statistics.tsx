import { useState } from "react";
import Calendar from "../Calendar";

function Statistics() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };
  console.log(selectedDate);

  return (
    <div>
      <h3>Statistics</h3>
      <p>View your total time spent on your tasks:</p>
      <Calendar onDateSelection={handleDateSelection} />
    </div>
  );
}

export default Statistics;
