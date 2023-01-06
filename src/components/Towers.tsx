import React from "react";

import { Tower, TowerControlWrapper } from "../components";
import { useTowers } from "../hooks";

const defaultInitData = [[1, 2, 3, 4, 5], [], []];

export const Towers: React.FC<{ initData?: number[][] }> = ({ initData }) => {
  const data = !!initData ? initData : defaultInitData;

  const {
    data: towers,
    selectTowerByKey,
    selectedKeys,
    errors,
    clearSelectedKeys,
  } = useTowers({ data });

  return (
    <>
      <div>
        <ul>
          {errors.map((error, j) => (
            <li key={j}>{error}</li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", position: "relative" }}>
        {towers.map((tower, j) => (
          <TowerControlWrapper
            key={j}
            onClick={() => selectTowerByKey(j)}
            selected={selectedKeys[0] === j}
          >
            <Tower data={tower} />
          </TowerControlWrapper>
        ))}
        <button onClick={() => clearSelectedKeys()}>clear</button>
      </div>
    </>
  );
};
