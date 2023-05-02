import React from "react";

type Props = {
  children: JSX.Element;
  selected: boolean;
  onClick: () => void;
};

export const SelectButton = ({ children, selected, onClick }: Props) => {
  return (
    <span className="text-[12px] p-[5px] md:p-[10px] lg:p-[10px]  md:text-[15px] lg:text-[15px]"
      style={{
        cursor: "pointer",
        borderRadius: "5px",
        border: "solid 1px gold",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? "700" : "500",
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
