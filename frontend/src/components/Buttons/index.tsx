import React from "react";

interface Button {
  name: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrimaryButton = (params: Button) => {
  return (
    <button className="btn btn-primary w-100" type={params.type}>
      {params.name}
    </button>
  );
};

export const DangerButton = (params: Button) => {
  return (
    <button className="btn btn-danger w-100" onClick={params.onClick} type={params.type}>
      {params.name}
    </button>
  );
};
