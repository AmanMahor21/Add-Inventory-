import React, { useState, createContext } from "react";
import KeyboardHeader from "./component/KeyboardHeader";
import Table from "./component/Table";
import Footer from "./component/Footer";

let invertoryContext = createContext();

const AddInventory = () => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [copyRecord, setCopyRecord] = useState([]);
  let inventoryValue = {
    setSelectedItem,
    selectedItem,
    copyRecord,
    setCopyRecord,
  };

  return (
    <invertoryContext.Provider value={inventoryValue}>
      <>
        <div className="d-flex flex-column " style={{ height: "100vh" }}>
          <div className="" style={{backgroundColor:"rgb(162 172 179)"}}>
            <h3 className="ps-4 pt-4">Add Inventory</h3>
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
