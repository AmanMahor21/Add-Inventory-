import React from "react";
import Select from "react-select";

const DropSelect = ({ selectChange, options, placeholder, name, ...rest }) => {
  let customStyle = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px",
      width: "200px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      width: "200px",
    }),
    container: (prov) => ({
      ...prov,
      minMenuHeight: "11px",
    }),

    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <>
      <Select
        className=""
        styles={customStyle}
        value={rest.value}
        placeholder={placeholder}
        options={options}
        minMenuHeight={333}
        menuPortalTarget={document.body}
        name={name}
        onChange={(e) => {
          console.log(e);
          let event = {
            name: name,
            value: e ? e.label : null,
          };
          selectChange(event);
        }}
      />
    </>
  );
};

export default DropSelect;
