import React, { useState } from "react";

import { Tower, TowerControlWrapper } from "../components";
import { useTowers } from "../hooks";

const defaultInitData = [[1, 2, 3, 4, 5], [], []];

export const Towers: React.FC<{ initData?: number[][] }> = ({ initData }) => {
  const data = !!initData ? initData : defaultInitData;

  const onError = (e: { messages: string[] }) => setErrorMessages(e.messages);
  const onValid = () => setErrorMessages([]);

  const towers = useTowers({ data, onError, onValid });

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  return (
    <>
      <div>
        <ul>
          {errorMessages.map((errorMessage, j) => (
            <li key={j}>{errorMessage}</li>
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
