import React, { StrictMode, useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import EventRecords from "./EventRecords";
import { invertoryContext } from "../AddInventory";

const Table = () => {
  const { list, setlist } = useContext(userContext);
  const { selectedItem } = useContext(invertoryContext);

  // EDITING TABLE'S EVENT KEYBOARD
  const selectChange = (eventIndex, data, recordIndex) => {
    setlist((prev) => {
      return prev.map((ele, i) => {
        if (i === eventIndex) {
          return {
            ...ele,
            eventRecords: ele.eventRecords.map((item, ind) => {
              if (selectedItem && item?.selected) {
                return {
                  ...item,
                  [data.name]: data.value,
                };
              } else if (ind === recordIndex) {
                return {
                  ...item,
                  [data.name]: data.value,
                };
              } else return item;
            }),
          };
        } else return ele;
      });
    });
  };

  const checkHandle = (e, index, eventIndex) => {
    setlist((curr) => {
      return curr.map((ele, i) => {
        if (i === eventIndex) {
          return {
            ...ele,
            eventRecords: ele.eventRecords.map((check, ind) => {
              if (ind === index) {
                return {
                  ...check,
                  selected: e.target.checked,
                };
              } else return check;
            }),
          };
        } else return ele;
      });
    });
  };

  return (
    <div
      className=" d-flex flex-column align-content-lg-start"
      style={{ paddingBottom: "66px" }}
    >
      {list &&
        list?.map((item, index) => {
          let firstIndexOfSelected = selectedItem
            ? item?.eventRecords?.findIndex((ele) => ele.selected)
            : -1;

          return (
            <div key={index} style={{ height: "100%" }}>
              <div
                className="accordion m-4"
                id="accordionPanelsStayOpenExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button pt-0 pb-0 accordian_header"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#panelsStayOpen-${index}`}
                      aria-expanded="true"
                      aria-controls={`panelsStayOpen-${index}`}
                    >
                      <input
                        type="checkbox"
                        name="eventCheckbox"
                        className="me-2 "
                        checked={item.eventCheckbox}
                      />
                      <span className="d-flex justify-content-between">
                        <span
                          className="pb-3 pt-3 ps-3 "
                          style={{
                            borderRight: "1px solid rgb(183 198 203)  ",
                            width: "300px",
                          }}
                        >
                          {item?.event}
                        </span>
                        <span
                          style={{
                            borderRight: "1px solid rgb(183 198 203)  ",

                            width: "250px",
                          }}
                          className="pb-3 pt-3 ps-3 "
                        >
                          {item?.eventDate}
                        </span>
                        <span
                          style={{
                            borderRight: "1px solid rgb(183 198 203)  ",

                            width: "120px",
                          }}
                          className="pb-3 pt-3 ps-3 "
                        >
                          {item?.time}
                        </span>
                        <span className="pb-3 pt-3 ps-3 ">
                          {item?.location}
                        </span>
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`panelsStayOpen-${index}`}
                    className="accordion-collapse collapse show overflow-auto"
                  >
                    {item?.eventRecords?.map((records, recordIndex) => {
                      return (
                        <EventRecords
                          key={recordIndex}
                          records={records}
                          eventindex={index}
                          recordIndex={recordIndex}
                          checkHandle={checkHandle}
                          selectChange={selectChange}
                          disabled={firstIndexOfSelected}
                          selectedItem={selectedItem}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Table;
