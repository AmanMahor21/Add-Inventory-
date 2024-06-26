import React from "react";

const SymbolInput = ({ selectChange, placeholder, name, value }) => {
  return (
    <div className=" inputField" style={{ minWidth: "155px" }}>
      <label class="visually-hidden" for="autoSizingInputGroup">
        {placeholder}
      </label>

      <div className="input-group">
        <label className="input-group-text" id="">
          £
        </label>
        <input
          type="number"
          className="ps-2 form-control"
          id="autoSizingInputGroup"
          name={name}
          style={{ fontSize: "14px", width: "auto" }}
          value={value}
          placeholder={placeholder}
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            let event = {
              name: name,
              value: e.target.value,
            };
            selectChange(event);
          }}
          debugger
        />
      </div>
    </div>
  );
};

export default SymbolInput;
