import React from "react";

const Input = ({ value = "", onChange = (e: any) => {}, ...rest }) => {
  return (
    <input
      className="form-control"
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
