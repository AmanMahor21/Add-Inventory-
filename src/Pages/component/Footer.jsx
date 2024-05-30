import React, { useContext } from "react";
import { userContext } from "../../App";
import { invertoryContext } from "../AddInventory";
import { MdDelete } from "react-icons/md";
import { LuBoxSelect } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const Footer = () => {
  const { setlist, list, getSavedEvent } = useContext(userContext);
  const { setCopyRecord, copyRecord, selectedItem, setSelectedItem } =
    useContext(invertoryContext);

  //HANDLE DELETE BTN
  const handleDlt = () => {
    setlist((prev) => {
      // UPDATE THE LIST BY REMOVING SELECTED ITEMS
      const updatedList = prev
        .map((ele) => ({
          ...ele,
          eventRecords: ele.eventRecords.filter((item) => !item.selected),
        }))
        .filter((ele) => ele.eventRecords.length > 0);

      // UPDATE LOCAL STORAGE BY REMOVING DELETED ITEMS
      const newSavedEvent = getSavedEvent
        .map((ele) => ({
          ...ele,
          eventRecords: ele.eventRecords.filter((item, i) =>
            updatedList.some((ule) =>
              ule.eventRecords.some((rec) => rec.index === item.index)
            )
          ),
        }))
        .filter((ele) => ele.eventRecords.length > 0);
      localStorage.setItem("savedEvents", JSON.stringify(newSavedEvent));
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
  };

  //HANDLE CONFIRM BUTTON
  const handle_ConfirmBtn = (e) => {
    setSelectedItem(false);
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
      className="p-4 align-items-lg-baseline fixed-bottom"
      style={{ backgroundColor: "rgb(104 138 161)" }}
    >
      {!selectedItem && (
        <div className=" d-flex gap-2 justify-content-between">
          <div className="">
            <button
              type="button"
              className="btn btn-dark me-2"
              onClick={handle_SelectAll}
            >
              <LuBoxSelect />
              Select All
            </button>
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={handle_DeselectAll}
            >
              <RxCrossCircled />
              Deselect All
            </button>
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={handleDlt}
            >
              <MdDelete />
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handle_MumltiEdit}
            >
              <FaRegEdit />
              Edit
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handle_SaveDraft}
            >
              <BsBoxArrowUpRight />
              Save Draft
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
