import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { FaCalendarAlt, FaChartBar } from "react-icons/fa";
import { Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { BiChevronDown } from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "@/pages/_app";

import { PolorProps } from "./type";
import { getPolors } from "../utils/polors";
import Image from "next/image";

type DialogProps = {
  open: boolean;
  selectedValue: PolorProps;
  onClose: (value: PolorProps) => void;
  polors: PolorProps[];
};

export const MUIDialog = ({
  open,
  selectedValue,
  onClose,
  polors,
}: DialogProps) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: PolorProps) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>名前を選択してください</DialogTitle>
      <List sx={{ pt: 0 }}>
        {polors.map((polor, i) => (
          <ListItem disableGutters key={i}>
            <ListItemButton onClick={() => handleListItemClick(polor)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={polor.polorName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const PolorSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({} as PolorProps);
  const { id, setId } = useContext(AppContext);
  const { polors, setPolors } = useContext(AppContext);
  const router = useRouter();
  const { pathname } = router;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: PolorProps) => {
    setOpen(false);
    setSelectedValue(value);
    setId(value.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPolors();
        console.log(data);
        setPolors(data);
        setSelectedValue(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <MUIDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        polors={polors}
      />
      <Button
        className="rounded-md cursor-pointer bg-[#EAE9E9] w-[160px] h-[50px] text-black  px-6 py-2 shadow-none hover:bg-[#EAE9E9] hover:shadow-md"
        onClick={handleClickOpen}
        variant="contained"
      >
        {selectedValue.polorName}
        <BiChevronDown />
      </Button>
    </div>
  );
};

const Aside = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className=" bg-[#FFFFFF] w-[220px]  h-full fixed top-0  z-50">
      <div className="flex flex-col items-center gap-4 ">
        <div className="py-10">
          <Image src="./polorIcon.svg" width={120} height={120} alt="" />
        </div>
        <Link href="/">
          <Button
            className={` rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md  ${
              pathname === "/" ? "bg-[#F4F3F3]" : "bg-white"
            }`}
          >
            <div className=" bg-[#48CAD9] p-3 rounded-full mr-3">
              <FaCalendarAlt className="w-[16px] h-[16px] text-white" />
            </div>
            <p className=" text-gray-700 w-full  flex items-start font-semibold ">
              行動記録
            </p>
          </Button>
        </Link>
        <Link href="/graph">
          <Button
            className={` rounded-full hover:bg-[#EAE9E9] w-[180px]  hover:shadow-md  ${
              pathname === "/graph" ? "bg-[#F4F3F3]" : "bg-white"
            }`}
          >
            <div className=" bg-[#F09783] p-3 rounded-full mr-3">
              <FaChartBar className="w-[16px] h-[16px] text-white" />
            </div>
            <p className=" text-gray-700 w-full flex items-start font-semibold">
              グラフ
            </p>
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-7  left-1/2  -translate-x-1/2">
        <PolorSelect />
      </div>
    </div>
  );
};
export default Aside;
