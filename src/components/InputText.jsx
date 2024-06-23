import React from "react";

const InputText = ({ placeholder, selectChange, name, value }) => {
  return (
    <>
      <input
        type="text"
        name={name}
        style={{
          fontSize: "14px",
          height: "38px",
        }}
        value={value}
        placeholder={placeholder}
        className="ps-2 border border-secondary-subtle rounded-2 border-border-opacity-75 inputField"
        onChange={(e) => {
          let event = {
            name: name,
            value: e?.target?.value,
          };
          selectChange(event);
        }}
      />
    </>
  );
};

export default InputText;
