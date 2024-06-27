import React, { useState, createContext, useContext } from "react";
import KeyboardHeader from "./component/KeyboardHeader";
import Table from "./component/Table";
import Footer from "./component/Footer";
import Select, { components } from "react-select";
import { userContext } from "../App";
import { SingleValue } from "react-select/animated";

let invertoryContext = createContext();
const AddInventory = () => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [copyRecord, setCopyRecord] = useState([]);
  const [selected, setSelcted] = useState(false);

  const [checkLabel, setCheckLabel] = useState({
    singleRow: "",
    wholeTable: "",
  });
  const { setSaveData } = useContext(userContext);

  const CustomOption = ({ isDisabled, isSelected, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="pt-1 pb-1 detailCell" style={{ borderBottom: "none" }}>
          {props.data.label}
        </div>
        <table className="eventDetails w-100">
          <tr className=" w-100 ">
            <td className="pt-1 pb-1 detailCell">{props.data.eventDate}</td>
            <td className="pt-1 pb-1 detailCell">{props.data.time}</td>
            <td className="pt-1 pb-1 detailCell">{props.data.location}</td>
          </tr>
        </table>
      </components.Option>
    );
  };
  let customStyle = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      transition: "width 0.3s ease-in-out",
      borderRadius: "12px",
      fontSize: "14px",
      minWidth: "200px",
      maxWidth: state.isFocused ? "600px" : "500px",
      borderColor: state.isFocused ? "none" : "#fff",
      className: "eventSelect",
      // backgroundColor: state.isFocused ? "rgb(208 205 202)" : "#fff",
    }),
    menu: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      width: "603px",
      "@media only screen and (max-width: 600px)": {
        ...provided["@media only screen and (max-width: 600px)"],
        width: "100%",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      // backgroundColor: state.isFocused ? "rgba(240, 165, 74, 0.1)" : "",
      backgroundColor: state.isFocused ? "rgba(230, 203, 176, 0.3)" : "",
      color: state.isFocused ? "#D8713A" : "",
      fontSize: "clamp(12px, 1vw, 14px)",
      // fontSize: "4px",
      width: "584px",
      "@media only screen and (max-width: 600px)": {
        ...provided["@media only screen and (max-width: 600px)"],
        width: "100%",
      },
    }),

    container: (prov) => ({
      ...prov,
      minMenuHeight: "11px",
      width: "100%",
    }),
  };
  //TURNING ON KEYBOARD FIELD
  const handleClick = (e, p) => {
    console.log(e);
    setSaveData((prev) => ({
      ...prev,
      event: e?.label,
      eventDate: e?.eventDate,
      time: e?.time,
      location: e?.location,
    }));
    return e;
  };
  let inventoryValue = {
    setCheckLabel,
    checkLabel,
    setSelectedItem,
    selectedItem,
    copyRecord,
    setCopyRecord,
    customStyle,
    setSelcted,
    selected,
    CustomOption,
    handleClick,
  };

  return (
    <invertoryContext.Provider value={inventoryValue}>
      <div className="invntorWrapper">
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "100vh" }}
        >
          <div className="eventBackground">
            <h3
              className="ps-4 pt-4 font"
              style={{ fontFamily: "Ubuntu Sans Mono", fontWeight: "500" }}
            >
              Ticket Inventory
            </h3>
            <KeyboardHeader />
          </div>

          <Table />

          <Footer />
        </div>
      </div>
    </invertoryContext.Provider>
  );
};

export { invertoryContext };
export default AddInventory;
