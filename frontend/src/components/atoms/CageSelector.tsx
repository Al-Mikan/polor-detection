import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
} from "@mui/material";
import {
  AnimalCageLogProps,
  UpdateAnimalCageLogProps,
  CreateAnimalCageLogProps,
  CageProps,
} from "../type";
import {
  getAnimalCageLog,
  createAnimalCageLog,
  updateAnimalCageLog,
} from "../../utils/animalCageLog";
import { getCages } from "../../utils/cage";
import { AppContext } from "@/pages/_app";

const CageSelector = () => {
  const [cages, setCages] = useState<CageProps[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [animalCageLog, setAnimalCageLog] = useState<AnimalCageLogProps | null>(
    null
  );

  const { animalId, setAnimalId } = useContext(AppContext);
  const { date, setDate } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const cagesData = await getCages();
      setCages(cagesData);
      console.log("cage", cagesData);

      const cageLogData = await getAnimalCageLog(date.format("YYYY-MM-DD"));
      console.log("cageLogData", cageLogData);
      const animalCage = cageLogData.find(
        (log: AnimalCageLogProps) => log.animalId === animalId
      );
      if (animalCage) {
        setAnimalCageLog(animalCage);
      } else {
        console.log("No animal cage log found");
        setAnimalCageLog(null);
      }
    };

    fetchData();
    console.log("fetch");
  }, [animalId, date]); // 依存配列に animalId と date を含める

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSelectCage = async (cageId: number) => {
    const animalCageData: CreateAnimalCageLogProps | UpdateAnimalCageLogProps =
      {
        animalId: animalId,
        cageId: cageId,
        date: date.format("YYYY-MM-DD"),
      };

    if (animalCageLog) {
      await updateAnimalCageLog(
        animalCageLog.id,
        animalCageData as UpdateAnimalCageLogProps
      );
      setAnimalCageLog({
        id: animalCageLog.id,
        ...animalCageData,
      });
    } else {
      const new_log = await createAnimalCageLog(
        animalCageData as CreateAnimalCageLogProps
      );
      setAnimalCageLog(new_log);
    }

    handleCloseDialog();
  };
  const selectedCage = (cageId: number) => {
    return cages.find((cage) => cage.id === cageId)?.cageName;
  };

  return (
    <div>
      <Button
        onClick={handleOpenDialog}
        variant="outlined"
        className={`rounded-full hover:bg-[#EAE9E9] hover:border-2 hover:border-[#342B43] w-[180px] hover:shadow-md p-2 border-2 border-[#342B43]  text-[#342B43]`}
      >
        {animalCageLog
          ? selectedCage(animalCageLog.cageId)
          : "設定してください"}
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>ケージを選択してください</DialogTitle>
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
