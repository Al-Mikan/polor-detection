import {
  Modal,
  Box,
  Tab,
  Tabs,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { TimeField } from "@mui/x-date-pickers/TimeField";

type AddModalProps = {
  open: boolean;
  handleClose: () => void;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 3 }}>{children}</Box>}
    </div>
  );
};

const AddModal = ({ open, handleClose }: AddModalProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    borderRadius: "12px",
    border: 0,
    p: 4,
  };

  const [value, setValue] = useState(0);
  const enrichments = ["ボール", "浮き輪", "sample", "sample2"];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">記録の追加</p>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="気温" />
            <Tab label="食事" />
            <Tab label="エンリッチメント" />
            <Tab label="イベント" />
          </Tabs>
        </Box>
        {/* 気温 */}
        <TabPanel value={value} index={0}>
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <p>時刻</p>
              <TimeField ampm={false} sx={{ m: 1, width: "150px" }} />
            </div>
            <div className="flex items-center justify-center space-x-6">
              <p>気温</p>
              <FormControl sx={{ m: 1, width: "150px" }} variant="outlined">
                <OutlinedInput
                  type="number"
                  inputProps={{ step: "any" }}
                  endAdornment={
                    <InputAdornment position="end">℃</InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <p>時刻</p>
              <TimeField ampm={false} sx={{ m: 1, width: "150px" }} />
            </div>
            <div className="flex items-center justify-center space-x-6">
              <p>内容</p>
              <TextField
                sx={{ m: 1, width: "150px" }}
                variant="outlined"
              ></TextField>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <p>重さ</p>
              <FormControl sx={{ m: 1, width: "150px" }} variant="outlined">
                <OutlinedInput
                  type="number"
                  inputProps={{ step: "any" }}
                  endAdornment={
                    <InputAdornment position="end">g</InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <FormGroup row={true}>
                {enrichments.map((enrichment, i) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={enrichment}
                      key={i}
                    />
                  );
                })}
              </FormGroup>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <p>イベント名</p>
              <TextField sx={{ m: 1, width: "200px" }} />
            </div>
          </div>
        </TabPanel>
        <div className="mt-6 flex space-x-4 justify-end">
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: "#2B7BF4", width: "100px" }}
          >
            決定
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
export default AddModal;
