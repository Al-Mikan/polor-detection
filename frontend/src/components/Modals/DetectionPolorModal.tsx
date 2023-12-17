import { Modal, Box, Button, FormControl, OutlinedInput } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

import { PolarProps } from "../type";
import { createDetectionPolars } from "../../utils/detectionPolar";
type EnrichmentModalProps = {
  open: boolean;
  handleClose: () => void;
  fetchData: () => void;
};

const DetectionPolarModal = ({
  open,
  handleClose,
  fetchData,
}: EnrichmentModalProps) => {
  const { date, setDate } = useContext(AppContext);
  const { id, setId } = useContext(AppContext);
  const { polars, setPolars } = useContext(AppContext);

  const createData = async (polar: PolarProps) => {
    await createDetectionPolars({
      polarId: polar.id,
      date: date.format("YYYY-MM-DD"),
    });
  };
  const handleListItemClick = async (polar: PolarProps) => {
    await createData(polar);
    fetchData();
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {date?.format("YYYY年MM月DD日")}に検知しているシロクマを選択してください
      </DialogTitle>
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
export default DetectionPolarModal;
