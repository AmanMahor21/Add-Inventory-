import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { invertoryContext } from "../AddInventory";
import { MdDelete } from "react-icons/md";
import { LuBoxSelect } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { IoCopy } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const Footer = () => {
  const { setlist, list, getSavedEvent } = useContext(userContext);
  const {
    setCopyRecord,
    copyRecord,
    selectedItem,
    setSelectedItem,
    checkLabel,
    setCheckLabel,
  } = useContext(invertoryContext);

  // console.log(checkLabel);
  // const [CheckLabel , setCheckLabel] = useState({
  // singleRow:"",
  // wholeTable:"",
  // })
  useEffect(() => {
    setlist((prev) => {
      let filterEvent = prev?.filter((ele) =>
        ele?.eventRecords?.some((itm) => itm.selected)
      );

      let filterRow = prev?.flatMap((bg) =>
        bg?.eventRecords?.filter((sml) => sml.selected)
      );
      list &&
        setCheckLabel((prev) => {
          return {
            ...prev,
            singleRow: filterRow?.length,
            wholeTable: filterEvent?.length,
          };
        });

      return prev;
    });
  }, [list]);

  //HANDLE DELETE BTN
  const handleDlt = () => {
    setlist((prev) => {
      // UPDATE THE LIST BY REMOVING SELECTED ITEMS
      const updatedList = prev
        .map((ele) => ({
          ...ele,
          eventRecords: ele?.eventRecords?.filter((item) => !item.selected),
        }))
        .filter((ele) => ele?.eventRecords?.length > 0);

      // UPDATE LOCAL STORAGE BY REMOVING DELETED ITEMS
      const newSavedEvent =
        getSavedEvent &&
        getSavedEvent
          .map((ele) => ({
            ...ele,
            eventRecords: ele?.eventRecords?.filter((item, i) =>
              updatedList?.some((ule) =>
                ule?.eventRecords?.some((rec) => rec?.index === item?.index)
              )
            ),
          }))
          .filter((ele) => ele?.eventRecords?.length > 0);
      newSavedEvent &&
        localStorage?.setItem("savedEvents", JSON.stringify(newSavedEvent));
      return updatedList;
    });
  };

  //HANDLE EDIT BUTTON
  const handle_MumltiEdit = (e) => {
    if (!selectedItem) {
      setCopyRecord([...list]);
      setSelectedItem(true);
    }
  };

  //HANDLE CANCEL BUTTON
  const handle_CancelBtn = (e) => {
    setlist([...copyRecord]);
    setSelectedItem(false);
    setlist((prev) => {
      return prev.map((ele) => ({
        ...ele,
        eventRecords: ele.eventRecords.map((el) => ({
          ...el,
          selected: false,
        })),
      }));
    });
  };

  //HANDLE CONFIRM BUTTON
  const handle_ConfirmBtn = (e) => {
    setSelectedItem(false);
    setlist((prev) => {
      return prev.map((ele) => ({
        ...ele,
        eventRecords: ele.eventRecords.map((el) => ({
          ...el,
          selected: false,
        })),
      }));
    });
  };
  // console.log(list);
  // HANDLE CLONE TO ALL BTN
  const cloneToNew_Btn = () => {
    setlist((prev) => {
      let checked_keyboard = prev.flatMap((ele) =>
        ele.eventRecords.filter((same) => same.selected)
      );
      let p = {
        eventRecords: checked_keyboard.map((ts) => {
          return { ...ts, index: uuid().slice(0, 8), selected: false };
        }),
      };
      return [p, ...prev];
    });
  };

  //HANDLE CLONE BTN
  const clone_Btn = () => {
    setlist((prev) => {
      let cloneObj = prev?.flatMap((ele) => {
        return ele?.eventRecords?.filter((e, i) => e.selected);
      });

      let fnd = prev.findIndex((itm) =>
        itm.eventRecords.some((chk) => chk.selected)
      );
      // CLONING CHECKED KEYBOARD ROW TO SAME EVENT
      let clonedTable = prev.map((cln, ind) => {
        if (ind === fnd) {
          return {
            ...cln,
            eventRecords: [...cln.eventRecords, ...cloneObj],
          };
        } else return cln;
      });
      // UNSELECT CHECK ROW AFTER CLONING
      return clonedTable.flatMap((item, j) => {
        return {
          ...item,
          eventRecords: item.eventRecords.flatMap((fil, x) => ({
            ...fil,
            selected: false,
          })),
        };
      });
    });
  };

  //HANDLE CALLBACK FUN OF SelectAll AND DeselectAll BTN
  const handle_SelectAll_DeselectAll = (isSelected) => {
    setlist((prev) => {
      return prev.map((ele, i) => {
        return {
          ...ele,
          eventRecords: ele?.eventRecords?.map((sel, j) => {
            return {
              ...sel,
              selected: isSelected,
            };
          }),
        };
      });
    });
  };

  //SAVING EVENTS ON LOCALSTORAGE ON SAVE DRAFT BTN
  const handle_SaveDraft = () =>
    localStorage.setItem("savedEvents", JSON.stringify(list));

  const handle_SelectAll = () => handle_SelectAll_DeselectAll(true);
  const handle_DeselectAll = () => handle_SelectAll_DeselectAll(false);

  return (
    <footer
      className="p-4 align-items-lg-baseline"
      // className="p-4 align-items-lg-baseline fixed-bottom"
      style={{ backgroundColor: "rgb(19 37 51) " }}
    >
      {!selectedItem && (
        <div className=" d-flex gap-2 justify-content-between footterWrapper">
          <div className=" d-flex footterWrapper">
            <button
              type="button"
              className="button me-2"
              onClick={handle_SelectAll}
            >
              <LuBoxSelect />
              Select All
            </button>
            <button
              type="button"
              className="button me-2"
              onClick={handle_DeselectAll}
            >
              <RxCrossCircled />
              Deselect All
            </button>
            <button type="button" className="button me-2" onClick={handleDlt}>
              <MdDelete />
              Delete
            </button>
            <button type="button" className="button me-2" onClick={clone_Btn}>
              <IoCopy /> Clone
            </button>
            <button
              type="button"
              className="button me-2"
              onClick={cloneToNew_Btn}
            >
              <MdDateRange /> Clone to new
            </button>

            <button
              type="button"
              className="button me-2"
              onClick={handle_MumltiEdit}
            >
              <FaRegEdit />
              Edit
            </button>
            {checkLabel.singleRow >= 1 && (
              <div
                className="d-flex text-white align-items-center rowCount_wrap"
                // style={{ paddingInline: "11px" }}
              >
                <span className="chkLabel">
                  <IoMdMenu />
                </span>

                <span className="text-white">
                  {checkLabel.singleRow} selected in&nbsp;
                  {checkLabel.wholeTable} events
                </span>
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              className="saveDrafteBtn"
              onClick={handle_SaveDraft}
            >
              <BsBoxArrowUpRight />
              <p>Save Draft</p>
            </button>
          </div>
        </div>
      )}
      {selectedItem && (
        <div>
          <button
            type="button"
            className="btn btn-light me-2"
            onClick={handle_CancelBtn}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handle_ConfirmBtn}
          >
            <FiEdit />
            Confirm
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
