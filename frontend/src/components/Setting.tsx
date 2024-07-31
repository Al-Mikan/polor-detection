import type { NextPageWithLayout } from "next";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { createCage, deleteCage, getCages, updateCage } from "../utils/cage";
import { CageProps, AnimalProps } from "../components/type";
import {
  createAnimal,
  deleteAnimal,
  getAnimals,
  updateAnimal,
} from "../utils/animal";
import { AppContext } from "@/pages/_app";

const Setting: NextPageWithLayout = () => {
  return (
    <div className="p-8">
      <div className="mb-10">
        <p className=" text-3xl font-bold mb-4">個体</p>
        <AnimalManager />
      </div>
      <div>
        <p className=" text-3xl font-bold mb-4">ケージ</p>
        <CageManager />
      </div>
    </div>
  );
};

export default Setting;

const CageManager = () => {
  const [cages, setCages] = useState<CageProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentCage, setCurrentCage] = useState<CageProps>({} as CageProps);
  useEffect(() => {
    fetchCages();
  }, []);

  const fetchCages = async () => {
    try {
      const cages = await getCages();
      setCages(cages);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpen = (cage: CageProps | null = null) => {
    if (cage) setCurrentCage(cage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (currentCage) {
      if (currentCage.id) {
        await updateCage(currentCage.id, { cageName: currentCage.cageName });
      } else {
        await createCage({ cageName: currentCage.cageName });
      }
      fetchCages();
    }
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await deleteCage(id);
    fetchCages();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCage({ ...currentCage, cageName: event.target.value });
  };

  return (
    <div className="bg-white w-2/3 rounded-md shadow-md">
      <List>
        {cages.map((cage) => (
          <ListItem key={cage.id}>
            <ListItemText primary={cage.cageName} />
            <Button onClick={() => handleOpen(cage)}>編集</Button>
            <Button
              onClick={() => handleDelete(cage.id)}
              className="text-red-500"
            >
              削除
            </Button>
          </ListItem>
        ))}
      </List>
      {open && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            {currentCage?.id ? "ケージ編集" : "ケージ追加"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Cage Name"
              type="text"
              fullWidth
              value={currentCage?.cageName || ""}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button onClick={handleSubmit}>決定</Button>
          </DialogActions>
        </Dialog>
      )}
      <Button
        onClick={() => handleOpen()}
        className="bg-slate-600 m-4 hover:bg-slate-800"
        variant="contained"
      >
        ＋追加
      </Button>
    </div>
  );
};

const AnimalManager = () => {
  // const [animals, setAnimals] = useState<AnimalProps[]>([]);
  const [open, setOpen] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState<AnimalProps>(
    {} as AnimalProps
  );

  const { animalId, setAnimalId, animals, setAnimals } = useContext(AppContext);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const animals = await getAnimals();
      setAnimals(animals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (animal: AnimalProps | null = null) => {
    if (animal) setCurrentAnimal(animal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentAnimal({} as AnimalProps);
  };

  const handleSubmit = async () => {
    if (currentAnimal.id) {
      await updateAnimal(currentAnimal.id, {
        animalName: currentAnimal.animalName,
        species: currentAnimal.species,
      });
    } else {
      await createAnimal({
        animalName: currentAnimal.animalName,
        species: currentAnimal.species,
      });
    }
    fetchAnimals();
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await deleteAnimal(id);
    fetchAnimals();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAnimal({
      ...currentAnimal,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="bg-white w-2/3 rounded-md shadow-md">
      <List>
        {animals.map((animal) => (
          <ListItem key={animal.id}>
            <ListItemText
              primary={animal.animalName}
              secondary={animal.species}
            />
            <Button onClick={() => handleOpen(animal)}>編集</Button>
            <Button
              onClick={() => handleDelete(animal.id)}
              className="text-red-500"
            >
              削除
            </Button>
          </ListItem>
        ))}
      </List>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {currentAnimal.id ? "個体編集" : "個体追加"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="animalName"
              label="個体名"
              type="text"
              fullWidth
              name="animalName"
              value={currentAnimal.animalName}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="species"
              label="種名"
              type="text"
              fullWidth
              name="species"
              value={currentAnimal.species}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button onClick={handleSubmit}>決定</Button>
          </DialogActions>
        </Dialog>
      )}
      <Button
        onClick={() => handleOpen()}
        className="bg-slate-600 m-4 hover:bg-slate-800"
        variant="contained"
      >
        ＋追加
      </Button>
    </div>
  );
};
