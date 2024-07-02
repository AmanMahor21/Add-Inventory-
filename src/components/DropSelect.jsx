import React from "react";
import Select from "react-select";
import { SingleValue } from "react-select/animated";

const DropSelect = ({ selectChange, options, placeholder, name, ...rest }) => {
  let customStyle = {
    control: (provided, base) => ({
      ...provided,
      fontSize: "14px",
      maxWidth: "210px",
      borderRadius: "6px",
      flex: "1  1 130px",
      minWidth: "140px",
      minHeight: "30px", // Reduce the minimum height
      height: "30px", // Set a fixed height
      alignItems: "flex-start",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(230, 203, 176, 0.3)" : "",
      fontSize: "clamp(12px, 1vw, 14px)",
      paddingBlock: "2px",
      color: state.isFocused ? "#D8713A" : "",
    }),
    menu: (provided, state) => ({
      ...provided,
      everFlow: "visible",
      zIndex: 99999,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "30px", // Set the same height for value container
      paddingTop: "0px", // Adjust padding if needed
      // flex: "1 0 195px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none", // Optionally remove the separator
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "clamp(11px , 0.92vw , 14px)",
      whiteSpace: "nowrap ", // Decrease font size of the placeholder
    }),

    container: (prov) => ({
      ...prov,
      minHeight: "30px", // Reduce the minimum height
      height: "30px", // Set a fixed height
      flex: "1 1 130px",
      maxWidth: "210px",

      display: "flex",
      minMenuHeight: "11px",
    }),
    indicatorsContainer: (pro, style) => ({
      ...pro,
      height: "30px",
    }),

    menuPortal: (base) => ({ ...base, zIndex: 999999 }),
  };

  return (
    <>
      {/* <label className="custom-label">Select an option</label> */}
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
