import React, { useContext, useState } from "react";
import Select from "react-select";
import { userContext } from "../../App";
import DropSelect from "../../components/DropSelect";
import InputNumber from "../../components/InputNumber";
import InputText from "../../components/InputText";
import SymbolInput from "../../components/SymbolInput";
import InputDate from "../../components/InputDate";
import Checkbox from "../../components/Checkbox";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuid } from "uuid";

import {
  EVENT_LIST,
  TICKET_TYPE,
  CATEGORY,
  SPLIT_TYPE,
} from "../../helpers/const";

const KeyboardHeader = () => {
  const { setlist, setSaveData, saveData, list } = useContext(userContext);
  const [selected, setSelcted] = useState("");

  //HANDLE ADD LISTING BTN
  const addListing = () => {
    //GIVING UNIQUE ID TO EACH EVENT RECORD
    setlist((prev) => {
      return prev.map((ele, el) => {
        return {
          ...ele,
          eventRecords: ele.eventRecords.map((row, ri) => {
            return {
              ...row,
              index: uuid().slice(0, 8),
            };
          }),
        };
      });
    });
    setlist((current) => {
      //EDIT FIRST KEYBOARD OF EACH EVENT ON ADD TO ALL EVENTS SWITCH
      if (selected) {
        return current.map((first, i) => {
          return {
            ...first,
            eventRecords: [saveData?.eventRecords[0], ...first?.eventRecords],
          };
        });
      } else {
        // IF LIST IS EMPTY
        if (current.length === 0) {
          return [{ ...saveData }];
        } else {
          // IF EVENTS ARE SAME
          let existEvent = current?.find(
            (item) => item?.event === saveData?.event
          );
          if (existEvent) {
            return current?.map((event, index) => {
              if (event?.event === existEvent?.event) {
                return {
                  ...event,
                  eventRecords: [
                    saveData?.eventRecords?.[0],
                    ...event?.eventRecords,
                  ],
                };
              } else return event;
            });
          }
          // IF EVENTS ARE DIFFERENT
          else return [saveData, ...current];
        }
      }
    });
  };

  //TURNING ON KEYBOARD FIELD
  const handleClick = (e, p) => {
    setSaveData((prev) => ({ ...prev, event: e?.label }));
    return e;
  };

  // SELECT ALL ACCORDIAN
  const handle_AddToAll = (e) => {
    setSelcted(e.target.checked);
    setlist((prev) => {
      return prev.map((ele) => {
        return {
          ...ele,
          eventCheckbox: e.target.checked,
        };
      });
    });
  };

  //HANDLE INITIAL INPUT OF KEYBOARD VALUE
  const handleOnChange = (data) => {
    setSaveData((current) => {
      return {
        ...current,
        eventRecords: [
          {
            ...current?.eventRecords?.[0],
            [data.name]: data.value,
          },
        ],
      };
    });
  };

  return (
    <>
      <div className="ps-4 pe-4  pt-lg-3">
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={selected}
          options={EVENT_LIST}
          onChange={handleClick}
          noOptionsMessage={() => {
            return <div className="text-body-secondary">Please wait</div>;
          }}
        />
      </div>
      <div className="ps-4 pe-2 pt-2">
        {saveData?.event && (
          <div className="row">
            <div className="d-flex col gap-2">
              <DropSelect
                options={TICKET_TYPE}
                placeholder={"Ticket Type"}
                selectChange={handleOnChange}
                name="TicketType"
              />
              <InputNumber
                placeholder={"Quantity"}
                name="quantity"
                value={saveData?.quantity}
                selectChange={handleOnChange}
              />
              <DropSelect
                options={SPLIT_TYPE}
                placeholder={"None"}
                selectChange={handleOnChange}
                name={"splitType"}
              />
              <InputNumber
                placeholder={"Max display quantity"}
                selectChange={handleOnChange}
                name="MaxDispalyQuantity"
              />
              <DropSelect
                options={CATEGORY}
                placeholder={"Category"}
                selectChange={handleOnChange}
                name="Category"
              />
              <DropSelect
                placeholder={"Section/block"}
                selectChange={handleOnChange}
                name="Section_block"
              />
              <InputText
                placeholder={"Row"}
                selectChange={handleOnChange}
                name="row"
              />
              <InputNumber
                placeholder={"First seat"}
                selectChange={handleOnChange}
                name="FirstSeat"
              />
            </div>
            <div className="d-flex mb-3  mt-3 justify-content-lg-start gap-2 ">
              <SymbolInput
                placeholder={"Face value"}
                selectChange={handleOnChange}
                name="FaceValue"
              />
              <SymbolInput
                placeholder={"Processed price"}
                selectChange={handleOnChange}
                name="ProcessedPrice"
              />
              <DropSelect placeholder={"None"} />
              <DropSelect placeholder={"None"} />
              <InputDate selectChange={handleOnChange} name="Date" />
              <Checkbox
                placeholder={"Tickets in hand"}
                name="ToggleCheck"
                selectChange={handleOnChange}
              />
            </div>
            <div className="w-100 d-flex justify-content-end pe-5 pt-2 head fs-6 mb-4 gap-2 align-items-center">
              <div className="form-check form-switch ">
                <label htmlFor="addToAll" className="ml-4 form-check-label">
                  Add to all events
                </label>
                <input
                  disabled={!list || list.length === 0}
                  role="switch"
                  type="checkbox"
                  name="addToAll"
                  id="addToAll"
                  className="mr-4 form-check-input"
                  onChange={handle_AddToAll}
                />
              </div>
              <button
                className="addBtnHover text-white"
                onClick={addListing}
                type="button"
              >
                <IoMdAdd />
                ADD LISTING
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KeyboardHeader;
