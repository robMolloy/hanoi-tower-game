import { useEffect, useState } from "react";

type TTowers = number[][];
type TSelectedKeys = [] | [number] | [number, number];

const errorMessagesMap = {
  isNoDisk: "error: there are no disks to move from this tower",
  isDiskTooBig: "error: disk is too big to move to that tower",
};

export const useTowers = ({ data: initTowersState }: { data: TTowers }) => {
  const [towersState, setTowersState] = useState(initTowersState);

  const [selectedKeys, setSelectedKeys] = useState<TSelectedKeys>([]);
  const clearSelectedKeys = () => setSelectedKeys([]);

  const [errorMessagesState, setErrorMessagesState] = useState<string[]>([]);

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

        const errorMessages = [];
        if (!isImmoveable) {
          towers[x] = otherDisks;
          towers[y] = [moveableDisk, ...towers[y]];
        } else {
          if (isNoDisk) errorMessages.push(errorMessagesMap.isNoDisk);
          if (isDiskTooBig) errorMessages.push(errorMessagesMap.isDiskTooBig);
        }

        setErrorMessagesState(errorMessages);
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
    errors: errorMessagesState,
  };
};
