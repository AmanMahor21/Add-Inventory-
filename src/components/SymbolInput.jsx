import React from "react";

const SymbolInput = ({ selectChange, ...rest }) => {
  return (
    <div className="col-auto">
      <label class="visually-hidden" for="autoSizingInputGroup">
        {rest.placeholder}
      </label>

      <div className="input-group">
        <label className="input-group-text" id="">
          £
        </label>
        <input
          type="number"
          className="ps-2 form-control"
          id="autoSizingInputGroup"
          name={rest.name}
          style={{ width: "145px", fontSize: "14px" }}
          value={rest.value}
          placeholder={rest.placeholder}
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            let event = {
              name: rest.name,
              value: e.target.value,
            };
            selectChange(event);
          }}
        />
      </div>
    </div>
  );
};

export default SymbolInput;
