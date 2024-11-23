import React, { useContext } from "react";
import { userContext } from "../../App";
import EventRecords from "./EventRecords";
import { invertoryContext } from "../AddInventory";
import Swal from "sweetalert2";

import EventDropDown from "../../components/EventDropDown";

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
    e.stopPropagation();
    console.log("hancle check");
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

  // HANDLE CLONE SELECT EVENT
  const cloneDropDown = (e) => {
    console.log("Asd");
    setlist((prev) => {
      if (!prev.find((obj) => obj.event === e.label)) {
        const clone = {
          ...prev[0],
          eventCheckbox: false,
          event: e.label,
          eventDate: e.eventDate,
          time: e.time,
          location: e.location,
        };
        let cloneCompleted = [clone, ...prev.slice(1)];
        return cloneCompleted.map((ele) => ({
          ...ele,
          eventRecords: ele.eventRecords.map((el) => ({
            ...el,
            selected: false,
          })),
        }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Event Already Exist",
        });
        return [...prev];
      }
    });
  };
  const eventHeader_Checkbox = (e, index) => {
    // e.stopPropagation();
    e.preventDefault(); // Prevent Bootstrap's default behavior

    // console.log(index);
    // console.log(e, index);
    setlist((prev) => {
      return prev.map((ele, ind) => {
        if (ind == index) {
          return {
            ...ele,
            eventCheckbox: e.target.checked,
          };
        }
        return ele;
      });
    });
  };
  // console.log(list);
  return (
    <div className=" d-flex flex-column align-content-lg-start flex-grow-1">
      {list &&
        list?.map((item, index) => {
          let firstIndexOfSelected = selectedItem
            ? item?.eventRecords?.findIndex((ele) => ele.selected)
            : -1;

          return (
            <div key={index} style={{ height: "100%" }}>
              <div
                className="accordion m-4 "
                id="accordionPanelsStayOpenExample"
              >
                <div className="accordion-item mb-5 pb-5">
                  <h2
                    className="accordion-header d-flex"
                    style={{ paddingLeft: "20px" }}
                  >
                    <input
                      style={{
                        // position: "relative",
                        // left: "10px",
                        zIndex: "22",
                      }}
                      type="checkbox"
                      name="eventCheckbox"
                      className="me-2   "
                      checked={item.eventCheckbox}
                      onClick={(e) => e.stopPropagation()} // Prevent propagation to the accordion
                      onChange={(e) => eventHeader_Checkbox(e, index)}
                    />
                    <button
                      className="accordion-button pt-0 pb-0 accordian_header "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#panelsStayOpen-${index}`}
                      aria-expanded="true"
                      aria-controls={`panelsStayOpen-${index}`}
                      style={{ position: " relative", left: "" }}
                    >
                      {!item.event ? (
                        <EventDropDown cloneDropDown={cloneDropDown} />
                      ) : (
                        <>
                          {/* <input
                            type="checkbox"
                            name="eventCheckbox"
                            className="me-2   "
                            checked={item.eventCheckbox}
                            onClick={(e) => e.stopPropagation()} // Prevent propagation to the accordion
                            onChange={(e) => eventHeader_Checkbox(e, index)}
                          /> */}

                          <span className="accodian_Wrapper">
                            <span
                              className=" accordian_Head"
                              style={{
                                borderRight: "1px solid rgb(183 198 203)  ",
                                // width: "300px",
                              }}
                            >
                              {item?.event}
                            </span>
                            <span
                              style={{
                                borderRight: "1px solid rgb(183 198 203)  ",
                                // width: "250px",
                              }}
                              className=" accordian_Head"
                            >
                              {item?.eventDate}
                            </span>
                            <span
                              style={{
                                borderRight: "1px solid rgb(183 198 203)  ",
                                // width: "120px",
                              }}
                              className=" accordian_Head"
                            >
                              {item?.time}
                            </span>
                            <span className=" accordian_Head location_label">
                              {item?.location}
                            </span>
                          </span>
                        </>
                      )}
                    </button>
                  </h2>
                  <div
                    id={`panelsStayOpen-${index}`}
                    className="accordion-collapse collapse show overflow-auto X_ScrollBar pe-1"
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
