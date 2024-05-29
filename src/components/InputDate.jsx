import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({ selectChange, ...rest }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      className=" border border-secondary-subtle rounded-2 border-border-opacity-75"
      showIcon
      style={{ top: "3px" }}
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
