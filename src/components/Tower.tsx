import React from "react";
import { Disk } from "./Disk";

export const Tower: React.FC<{ data: number[] }> = ({ data }) => {
  return (
    <div style={{ verticalAlign: "bottom" }}>
      {data.map((width, j) => (
        <Disk key={j} width={width} />
      ))}
    </div>
  );
};
