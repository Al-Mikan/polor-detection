import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { FaCalendarAlt, FaChartBar } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import { AppContext } from "@/pages/_app";

import { AnimalProps } from "./type";
import { getAnimals } from "../utils/animal";
import { FaGear } from "react-icons/fa6";

type DialogProps = {
  open: boolean;
  selectedValue: AnimalProps;
  onClose: (value: AnimalProps) => void;
  animals: AnimalProps[];
};

export const MUIDialog = ({
  open,
  selectedValue,
  onClose,
  animals,
}: DialogProps) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: AnimalProps) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>個体を選択してください</DialogTitle>
      <List sx={{ pt: 0 }}>
        {animals.map((animal) => (
          <ListItem disableGutters key={animal.id}>
            <ListItemButton onClick={() => handleListItemClick(animal)}>
              <div className="flex justify-between items-center w-full px-2">
                <p> {animal.species}</p>
                <p>{animal.animalName}</p>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const AnimalSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<AnimalProps>(
    {} as AnimalProps
  );
  const { animalId, setAnimalId, animals, setAnimals } = useContext(AppContext);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await getAnimals();
      if (data.length > 0) {
        setAnimals(data);
        setSelectedValue(data[0]);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: AnimalProps) => {
    setOpen(false);
    setSelectedValue(value);
    setAnimalId(value.id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MUIDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        animals={animals}
      />
      <Button
        className="rounded-xl  flex flex-col cursor-pointer bg-[#EAE9E9] w-[180px] h-[100px] text-black  shadow-none hover:bg-[#EAE9E9] hover:shadow-lg"
        onClick={handleClickOpen}
        variant="contained"
      >
        <p className="text-sm" style={{ textTransform: "none" }}>
          {selectedValue ? selectedValue.species : ""}
        </p>
        <p
          className=" text-xl"
          style={{
            width: "100%",
            textTransform: "none",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {selectedValue ? selectedValue.animalName : "選択してください"}
        </p>
      </Button>
    </div>
  );
};

const Aside = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="bg-[#FFFFFF] w-[220px] h-full fixed top-0 z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="py-10">
          <Image
            src="./animalIcon.svg"
            width={120}
            height={120}
            alt="Animal Icon"
          />
        </div>
        <Link href="/">
          <Button
            className={`rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md ${
              pathname === "/" ? "bg-[#F4F3F3]" : "bg-white"
            }`}
          >
            <div className="bg-[#48CAD9] p-3 rounded-full mr-3">
              <FaCalendarAlt className="w-[16px] h-[16px] text-white" />
            </div>
            <p className="text-gray-700 w-full flex items-start font-semibold">
              行動記録
            </p>
          </Button>
        </Link>
        <Link href="/graph">
          <Button
            className={`rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md ${
              pathname === "/graph" ? "bg-[#F4F3F3]" : "bg-white"
            }`}
          >
            <div className="bg-[#F09783] p-3 rounded-full mr-3">
              <FaChartBar className="w-[16px] h-[16px] text-white" />
            </div>
            <p className="text-gray-700 w-full flex items-start font-semibold">
              グラフ
            </p>
          </Button>
        </Link>
        <Link href="/setting">
          <Button
            className={`rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md ${
              pathname === "/setting" ? "bg-[#F4F3F3]" : "bg-white"
            }`}
          >
            <div className="bg-slate-600 p-3 rounded-full mr-3">
              <FaGear className="w-[16px] h-[16px] text-white" />
            </div>
            <p className="text-gray-700 w-full flex items-start font-semibold">
              設定
            </p>
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <AnimalSelect />
      </div>
    </div>
  );
};

export default Aside;
