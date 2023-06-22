import Link from "next/link";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { BiChevronDown } from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "@/pages/_app";

import { polors } from "@/data/sample";
import { polorProps } from "./type";

type DialogProps = {
  open: boolean;
  selectedValue: polorProps;
  onClose: (value: polorProps) => void;
};

export const MUIDialog = ({ open, selectedValue, onClose }: DialogProps) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: polorProps) => {
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
              <ListItemText primary={polor.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(polors[0]);
  const { id, setId } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: polorProps) => {
    setOpen(false);
    setSelectedValue(value);
    console.log(value);
    setId(value.id);
  };

  return (
    <div className="h-fit p-4 w-full fixed top-0 flex justify-between bg-white z-50">
      <div className="ml-[80px] text-3xl font-bold">カレンダー</div>
      <MUIDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <Button
        className=" rounded cursor-pointer bg-backGround  text-black  px-6 py-2 "
        onClick={handleClickOpen}
        variant="text"
      >
        {selectedValue.name}
        <BiChevronDown />
      </Button>
    </div>
  );
};
export default Header;
