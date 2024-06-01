import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import AddInventory from "./Pages/AddInventory";
import { v4 as uuid } from "uuid";

let userContext = createContext();

function App() {
  let getSavedEvent = JSON.parse(localStorage.getItem("savedEvents"));
  const [list, setlist] = useState([]);
  const [unique, setUuid] = useState("");

  const [saveData, setSaveData] = useState({
    event: "",
    eventDate:"",
    time:"",
    location:"",
    eventCheckbox: false,
    eventRecords: [
      {
        index: uuid().slice(0, 8),
        TicketType: null,
        selected: false,
        quantity: "",
        splitType: "",
        Category: "",
        MaxDispalyQuantity: "",
        Section_block: "",
        row: "",
        FaceValue: "",
        ProcessedPrice: "",
        FirstSeat: "",
        Date: "",
        ToggleCheck: "",
      },
    ],
  });
  useEffect(() => {
    if (getSavedEvent) {
      setlist([...getSavedEvent]);
    }
  }, []);

  let contextArray = {
    setSaveData,
    saveData,
    list,
    getSavedEvent,
    setlist,
    unique,
    setUuid,
  };

  return (
    <userContext.Provider value={contextArray}>
      <>
        <AddInventory />
      </>
    </userContext.Provider>
  );
}
export { userContext };
export default App;
