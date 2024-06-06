import React, { useState, createContext, useContext } from "react";
import KeyboardHeader from "./component/KeyboardHeader";
import Table from "./component/Table";
import Footer from "./component/Footer";
import Select, { components } from "react-select";
import { userContext } from "../App";

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
        <div
          className="pt-1 pb-1"
          style={{ border: "1px solid #DFE2E4", borderBottom: "none" }}
        >
          {props.data.label}
        </div>
        <table>
          <tr className="d-flex">
            <td
              className="pt-1 pb-1"
              style={{ border: "1px solid #DFE2E4", width: "130px" }}
            >
              {props.data.eventDate}
            </td>
            <td
              className="pt-1 pb-1"
              style={{
                border: "1px solid #DFE2E4",
                width: "70px",
                borderLeft: "none",
              }}
            >
              {props.data.time}
            </td>
            <td
              className="pt-1 pb-1"
              style={{
                border: "1px solid #DFE2E4",
                width: "360px",
                borderLeft: "none",
              }}
            >
              {props.data.location}
            </td>
          </tr>
        </table>
      </components.Option>
    );
  };
  let customStyle = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      minWidth: "400px",
      width: state.isFocused ? "600px" : "500px",
    }),
    menu: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      width: "603px",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgb(233, 227, 221)" : "",
      width: "584px",
    }),

    container: (prov) => ({
      ...prov,
      minMenuHeight: "11px",
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
      <>
        <div className="d-flex flex-column " style={{ height: "100vh" }}>
          <div className="" style={{ backgroundColor: "rgb(104 138 161)" }}>
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
      </>
    </invertoryContext.Provider>
  );
};

export { invertoryContext };
export default AddInventory;
