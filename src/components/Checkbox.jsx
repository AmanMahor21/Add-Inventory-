import React from "react";

const Checkbox = ({ selectChange, name, placeholder, value }) => {
  return (
    <>
      <div
        className="form-check border ps-2  pe-12 bg-white align-content-center d-flex border border-secondary-subtle rounded-2 border-border-opacity-75 inputField"
        // style={{ maxWidth: "210px" }}
      >
        <input
          className=" ps-2 justify-content-center"
          type="checkbox"
          defaultChecked={value}
          id="flexCheckDefault"
          onChange={(e) => {
            let event = {
              name: name,
              value: e.target.checked,
            };
            selectChange(event);
          }}
        />
        <label
          className="form-check-label align-content-center input-group-text h-100"
          htmlFor="flexCheckDefault"
          style={{
            border: "none",
            fontSize: "clamp(11px, 0.92vw, 14px)",
            background: "none",
          }}
        >
          {placeholder}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
