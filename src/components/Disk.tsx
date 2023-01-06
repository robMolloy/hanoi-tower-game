import React from "react";

export const Disk: React.FC<{ width: number }> = ({ width }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <span
        style={{
          border: "1px solid black",
          display: "inline-block",
          minWidth: `${width * 20}px`,
        }}
      >
        {width}
      </span>
    </div>
  );
};
