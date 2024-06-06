import React, { useContext } from "react";
import { userContext } from "../../App";
import { v4 as uuid } from "uuid";
import { invertoryContext } from "../AddInventory";
import KeyboardField from "./KeyboardField";

const KeyboardHeader = () => {
  const { setlist, setSaveData, saveData } = useContext(userContext);
  const { handleClick, CustomOption, customStyle, setSelcted, selected } =
    useContext(invertoryContext);

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

  // SELECT ALL ACCORDIAN
  const handle_AddToAll = (e) => {
    setSelcted(() => e.target.checked);
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
      <KeyboardField
        selected={selected}
        customStyle={customStyle}
        CustomOption={CustomOption}
        handleClick={handleClick}
        handleOnChange={handleOnChange}
        handle_AddToAll={handle_AddToAll}
        addListing={addListing}
      />
    </>
  );
};

export default KeyboardHeader;
