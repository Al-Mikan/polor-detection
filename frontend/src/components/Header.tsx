import Button from "@mui/material/Button";
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
import { useRouter } from "next/router";

import { polorProps } from "./type";
import { getPolors } from "../utils/polors";

type DialogProps = {
  open: boolean;
  selectedValue: polorProps;
  onClose: (value: polorProps) => void;
  polors: polorProps[];
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
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({} as polorProps);
  const [polors, setPolors] = useState([] as polorProps[]);
  const { id, setId } = useContext(AppContext);
  const router = useRouter();
  const { pathname } = router;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: polorProps) => {
    setOpen(false);
    setSelectedValue(value);
    setId(value.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPolors();
        setPolors(data);
        setSelectedValue(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-fit p-4 w-full fixed top-0 flex justify-between bg-white z-50">
      <div className="ml-[80px] text-3xl font-bold">
        {pathname === "/graph" ? "グラフ" : "カレンダー"}
      </div>
      <MUIDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        polors={polors}
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
