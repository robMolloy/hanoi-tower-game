import React from "react";

type TTowerControlWrapper = React.FC<{
  children?: React.ReactNode;
  onClick: React.HTMLAttributes<HTMLDivElement>["onClick"];
  selected: boolean;
}>;

export const TowerControlWrapper: TTowerControlWrapper = ({
  children,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: selected ? "2px solid blue" : "1px dashed blue",
        minWidth: "100px",
        margin: "10px",
      }}
    >
      {children}
    </div>
  );
};
