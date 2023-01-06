import React, { useState } from "react";

import { Tower, TowerControlWrapper } from "../components";
import { useTowers } from "../hooks";

const defaultInitData = [[1, 2, 3, 4, 5], [], []];

export const Towers: React.FC<{ initData?: number[][] }> = ({ initData }) => {
  const data = !!initData ? initData : defaultInitData;

  const towers = useTowers({ data });

  return (
    <>
      <div>
        <ul>
          {towers.errors.map((error, j) => (
            <li key={j}>{error}</li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", position: "relative" }}>
        {towers.data.map((tower, j) => (
          <TowerControlWrapper
            key={j}
            onClick={() => towers.selectTowerByKey(j)}
            selected={towers.selectedKeys[0] === j}
          >
            <Tower data={tower} />
          </TowerControlWrapper>
        ))}
        <button onClick={() => towers.clearSelectedKeys()}>clear</button>
      </div>
    </>
  );
};
