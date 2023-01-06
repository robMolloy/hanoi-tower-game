import { useEffect, useState } from "react";

type TTowers = number[][];
type TSelectedKeys = [] | [number] | [number, number];

export const useTowers = ({
  data: initTowersState,
  onError,
  onValid,
}: {
  data: TTowers;
  onError: (e: { messages: string[] }) => void;
  onValid: () => void;
}) => {
  const [towersState, setTowersState] = useState(initTowersState);
  const [selectedKeys, setSelectedKeys] = useState<TSelectedKeys>([]);
  const clearSelectedKeys = () => setSelectedKeys([]);

  const selectTowerByKey = (i: number) => {
    if (selectedKeys.length === 0) setSelectedKeys([i]);
    else if (selectedKeys.length === 1) setSelectedKeys([selectedKeys[0], i]);
  };

  const moveTopDisk = (towers: TTowers) => ({
    fromTower: (x: number) => ({
      toTower: (y: number) => {
        const oldTower = towers[x];
        const newTower = towers[y];
        const [moveableDisk, ...otherDisks] = oldTower;

        const isNoDisk = oldTower.length === 0;
        const isDiskTooBig = moveableDisk > newTower[0];
        const isImmoveable = isNoDisk || isDiskTooBig;

        if (!isImmoveable) {
          towers[x] = otherDisks;
          towers[y] = [moveableDisk, ...towers[y]];
          onValid();
        } else {
          const messages = [];
          if (isNoDisk)
            messages.push("error: there are no disks to move from this tower");
          if (isDiskTooBig)
            messages.push("error: disk is too big to move to that tower");

          onError({ messages });
        }

        setTowersState([...towers]);
      },
    }),
  });

  useEffect(() => {
    if (selectedKeys[0] !== undefined && selectedKeys[1] !== undefined) {
      moveTopDisk(towersState)
        .fromTower(selectedKeys[0])
        .toTower(selectedKeys[1]);

      clearSelectedKeys();
    }
  }, [towersState, selectedKeys, setSelectedKeys]);

  return {
    moveTopDisk,
    selectTowerByKey,
    selectedKeys,
    clearSelectedKeys,
    data: towersState,
  };
};
