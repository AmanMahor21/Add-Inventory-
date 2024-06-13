import React, { useContext } from "react";
import Select from "react-select";
import { userContext } from "../../App";
import DropSelect from "../../components/DropSelect";
import InputNumber from "../../components/InputNumber";
import InputText from "../../components/InputText";
import SymbolInput from "../../components/SymbolInput";
import InputDate from "../../components/InputDate";
import Checkbox from "../../components/Checkbox";
import { IoMdAdd } from "react-icons/io";

import {
  EVENT_LIST,
  TICKET_TYPE,
  CATEGORY,
  SPLIT_TYPE,
} from "../../helpers/const";

const KeyboardField = ({
  selected,
  customStyle,
  CustomOption,
  handleClick,
  handleOnChange,
  handle_AddToAll,
  addListing,
}) => {
  const { saveData, list } = useContext(userContext);

  return (
    <>
      <div className="ps-4 pe-4 pb-1 pt-lg-3">
        <Select
          className="basic-single"
          classNamePrefix="select"
          styles={customStyle}
          isDisabled={selected}
          components={{ Option: CustomOption }}
          options={EVENT_LIST}
          onChange={handleClick}
          noOptionsMessage={() => {
            return <div className="text-body-secondary">Please wait</div>;
          }}
        />
      </div>
      <div className="ps-4 pe-2 pt-2 ">
        {saveData?.event && (
          <div className="row">
            <div className="flex-wrap d-flex col gap-2">
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
            <div className="flex-wrap d-flex mb-3  mt-3 justify-content-lg-start gap-2 w-100">
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
                  onChange={(e) => handle_AddToAll(e)}
                />
              </div>
              <button
                // className="btn btn-outline-success fw-bold  "
                className="addBtnHover"
                onClick={addListing}
                type="button"
              >
                {/* <IoMdAdd /> */}
                ADD LISTING
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KeyboardField;
