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

import { PolarProps } from "./type";
import { getPolars } from "../utils/polars";
import Image from "next/image";

type DialogProps = {
  open: boolean;
  selectedValue: PolarProps;
  onClose: (value: PolarProps) => void;
  polars: PolarProps[];
};

export const MUIDialog = ({
  open,
  selectedValue,
  onClose,
  polars,
}: DialogProps) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: PolarProps) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>名前を選択してください</DialogTitle>
      <List sx={{ pt: 0 }}>
        {polars.map((polar, i) => (
          <ListItem disableGutters key={i}>
            <ListItemButton onClick={() => handleListItemClick(polar)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={polar.polarName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const PolarSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({} as PolarProps);
  const { id, setId } = useContext(AppContext);
  const { polars, setPolars } = useContext(AppContext);
  const router = useRouter();
  const { pathname } = router;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: PolarProps) => {
    setOpen(false);
    setSelectedValue(value);
    setId(value.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPolars();
        console.log(data);
        setPolars(data);
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
        polars={polars}
      />
      <Button
        className="rounded-md cursor-pointer bg-[#EAE9E9] w-[160px] h-[50px] text-black  px-6 py-2 shadow-none hover:bg-[#EAE9E9] hover:shadow-md"
        onClick={handleClickOpen}
        variant="contained"
      >
        {selectedValue.polarName}
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
          <Image src="./polarIcon.svg" width={120} height={120} alt="" />
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
        <PolarSelect />
      </div>
    </div>
  );
};
export default Aside;
