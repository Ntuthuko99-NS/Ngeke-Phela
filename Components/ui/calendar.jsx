// Simple Calendar Component (no external libraries)

import { useState } from "react";

export function Calendar({ onSelect }) {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);


  // Handle when user clicks a date
  function handleDateClick(date) {
    setSelectedDate(date);

    if (onSelect) {
      onSelect(date);
    }
  }


  // Create simple days for current month (basic version)
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push(date);
  }


  return (
    <div className="calendar">

      {/* Header */}
      <div className="calendar-header">
        {today.toLocaleString("default", {
          month: "long",
          year: "numeric"
        })}
      </div>


      {/* Days grid */}
      <div className="calendar-grid">

        {days.map((date) => {

          const isSelected =
            selectedDate &&
            date.toDateString() === selectedDate.toDateString();

          const isToday =
            date.toDateString() === today.toDateString();

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={`day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}

      </div>
    </div>
  );
}
