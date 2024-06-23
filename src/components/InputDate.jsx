import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
// import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({ selectChange, ...rest }) => {
  const [startDate, setStartDate] = useState(new Date());
  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ paddingLeft: "80px", zIndex: "9999" }}>
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  return (
    <DatePicker
      className=" border border-secondary-subtle rounded-2 border-border-opacity-75 inputField ps-5"
      showIcon
      style={{ top: "3px", zIndex: 999999 }}
      calendarContainer={MyContainer}
      name={rest.name}
      selected={rest.value || startDate}
      onChange={(e) => {
        const dateString = new Date(e).toLocaleDateString();
        setStartDate(new Date(e).toLocaleDateString());
        let event = {
          name: rest.name,
          value: dateString,
        };

        selectChange(event);
      }}
    />
  );
};

export default InputDate;
