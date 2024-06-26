import React, { useContext } from "react";
import { invertoryContext } from "../Pages/AddInventory";
import { EVENT_LIST } from "../helpers/const";
import Select from "react-select";
const EventDropDown = ({ cloneDropDown }) => {
  const { CustomOption, customStyle, selected } =
    useContext(invertoryContext);
  return (
    <>
      <Select
        className="basic-single pt-2 pb-2"
        classNamePrefix="select"
        styles={customStyle}
        isDisabled={selected}
        components={{ Option: CustomOption }}
        options={EVENT_LIST}
        onChange={cloneDropDown}
        noOptionsMessage={() => {
          return <div className="text-body-secondary">Not Found</div>;
        }}
      />
    </>
  );
};

export default EventDropDown;
