import React, { useState, useEffect } from "react";
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Dialog,
} from "@mui/material";
import { getCages } from "../../utils/cage"; // ケージ情報を取得する関数
import {
  AnimalCageLogProps,
  UpdateAnimalCageLogProps,
  CreateAnimalCageLogProps,
} from "../type";
import {
  getAnimalCageLog,
  createAnimalCageLog,
  updateAnimalCageLog,
} from "../../utils/animalCageLog";
import { CageProps } from "../type";

type CageSelectorProps = {
  animalId: number;
  date: string;
};

const CageSelector = ({ animalId, date }: CageSelectorProps) => {
  const [cages, setCages] = useState<CageProps[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [animalCageLog, setAnimalCageLog] = useState<AnimalCageLogProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cagesData = await getCages();
      setCages(cagesData);
      const cageLogData = await getAnimalCageLog(date);
      const animalCage = cageLogData.find(
        (log: AnimalCageLogProps) => log.animalId === animalId
      );
      setAnimalCageLog(animalCage);
    };
    fetchData();
  }, [animalId, date]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSelectCage = async (cageId: number) => {
    const cageLogExists = animalCageLog.length > 0;
    console.log(animalCageLog);
    const animalCageData: CreateAnimalCageLogProps | UpdateAnimalCageLogProps =
      {
        animalId,
        cageId,
        date,
      };

    if (cageLogExists) {
      await updateAnimalCageLog(
        animalCageLog[0].id,
        animalCageData as UpdateAnimalCageLogProps
      );
    } else {
      await createAnimalCageLog(animalCageData as CreateAnimalCageLogProps);
    }

    // setCurrentCage(cages.find((cage) => cage.id === cageId) || null);
    setAnimalCageLog([
      {
        id: cageLogExists ? animalCageLog[0].id : 0,
        ...animalCageData,
      },
    ]);
    handleCloseDialog();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}>
        {animalCageLog.length > 0
          ? cages.find((cage) => cage.id === animalCageLog[0].cageId)?.cageName
          : "ケージを選択"}
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <List>
          {cages.map((cage) => (
            <ListItem key={cage.id} onClick={() => handleSelectCage(cage.id)}>
              <ListItemText primary={cage.cageName} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default CageSelector;
