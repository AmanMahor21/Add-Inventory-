import React from "react";
import DropSelect from "../../components/DropSelect";
import { SPLIT_TYPE, TICKET_TYPE, CATEGORY } from "../../helpers/const";
import InputNumber from "../../components/InputNumber";
import InputText from "../../components/InputText";
import InputDate from "../../components/InputDate";
import Checkbox from "../../components/Checkbox";
import SymbolInput from "../../components/SymbolInput";
const EventRecords = ({
  records,
  eventindex,
  recordIndex,
  checkHandle,
  selectChange,
  disabled,
  selectedItem,
}) => {
  return (
    <div
      className={`accordion-body d-flex gap-2 flex-grow-1${
        selectedItem && disabled !== -1 && disabled !== recordIndex
          ? "pe-none opacity-75"
          : "bg-grey"
      }`}
    >
      <input
        className=""
        type="checkbox"
        style={{ opacity: "100" }}
        name="selected"
        checked={records?.selected}
        onChange={(e) => checkHandle(e, recordIndex, eventindex)}
      />
      <DropSelect
        options={TICKET_TYPE}
        placeholder={"Ticket Type"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="TicketType"
        value={
          records.TicketType
            ? { label: records.TicketType, value: records.TicketType }
            : null
        }
      />
      <InputNumber
        placeholder={"Quantity"}
        value={records && records.quantity}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="quantity"
      />
      <DropSelect
        options={SPLIT_TYPE}
        placeholder={"None"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="splitType"
        value={
          records.splitType
            ? { label: records.splitType, value: records.splitType }
            : null
        }
      />
      <InputNumber
        placeholder={"Max display quantity"}
        value={records.MaxDispalyQuantity}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="MaxDispalyQuantity"
      />
      <DropSelect
        options={CATEGORY}
        placeholder={"Category"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="Category"
        value={
          records.Category
            ? { label: records.Category, value: records.Category }
            : null
        }
      />
      <DropSelect
        placeholder={"Section/block"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="Category"
      />
      <InputText
        placeholder={"Row"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="row"
        value={records.row}
      />
      <InputNumber
        placeholder={"First seat"}
        value={records.FirstSeat}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="FirstSeat"
      />
      <SymbolInput
        placeholder={"Face value"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="FaceValue"
        value={records.FaceValue}
      />
      <SymbolInput
        placeholder={"Processed price"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="ProcessedPrice"
        value={records.ProcessedPrice}
      />
      <DropSelect
        placeholder={"None"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }} // name="Category"
      />
      <DropSelect
        placeholder={"None"}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }} // name="Category"
      />
      <InputDate
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
        name="Date"
        value={records.Date}
      />
      <Checkbox
        placeholder={"Tickets in hand"}
        name="ToggleCheck"
        value={records.ToggleCheck}
        selectChange={(data) => {
          selectChange(eventindex, data, recordIndex);
        }}
      />
    </div>
  );
};

export default EventRecords;
