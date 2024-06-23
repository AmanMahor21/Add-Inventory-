import React from "react";

const InputNumber = ({ placeholder, name, value, selectChange }) => {
  return (
    <>
      <input
        style={{
          fontSize: "14px",
          height: "38px",
        }}
        type="number"
        name={name}
        placeholder={placeholder}
        value={value}
        className=" ps-2 border border-secondary-subtle rounded-2 border-border-opacity-75 inputField"
        onChange={(e) => {
          let event = {
            name: name,
            value: e.target.value,
          };
          selectChange(event);
        }}
      />
    </>
  );
};

export default InputNumber;
