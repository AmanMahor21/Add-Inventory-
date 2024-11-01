import React, { useContext, useState } from "react";
import { invertoryContext } from "../Pages/AddInventory";
import { EVENT_LIST } from "../helpers/const";
import Select from "react-select";

const EventDropDown = ({ cloneDropDown }) => {
  const { CustomOption, customStyle, selected } = useContext(invertoryContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  return (
    <Select
      className="basic-single pt-2 pb-2"
      classNamePrefix="select"
      styles={customStyle}
      isDisabled={selected}
      components={{ Option: CustomOption }}
      options={EVENT_LIST}
      onChange={cloneDropDown}
      menuIsOpen={menuIsOpen}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      noOptionsMessage={() => (
        <div className="text-body-secondary">Not Found</div>
      )}
      menuPortalTarget={document.body} 
    />
  );
};

export default EventDropDown;
