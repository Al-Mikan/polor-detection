import {
  MealProps,
  eventProps,
  temperatureProps,
  enrichmentProps,
} from "./type";
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
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

type EditModalProps = {
  title: string;
  content: MealProps | temperatureProps | enrichmentProps | eventProps;
  open: boolean;
  handleClose: () => void;
};

const EditModal = ({ title, content, open, handleClose }: EditModalProps) => {
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

  const enrichments = ["ボール", "浮き輪", "sample", "sample2"];
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">記録の編集・削除</p>
        {"meal" in content ? (
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <p>時刻</p>
              <TimeField
                ampm={false}
                sx={{ m: 1, width: "150px" }}
                defaultValue={dayjs(content.time, "HH:mm")}
              />
            </div>
            <div className="flex items-center justify-center space-x-6">
              <p>内容</p>
              <TextField
                sx={{ m: 1, width: "150px" }}
                variant="outlined"
                defaultValue={content.meal}
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
                  defaultValue={content.value}
                />
              </FormControl>
            </div>
          </div>
        ) : "temperature" in content ? (
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <p>時刻</p>
              <TimeField
                ampm={false}
                sx={{ m: 1, width: "150px" }}
                defaultValue={dayjs(content.time, "HH:mm")}
              />
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
                  defaultValue={content.temperature}
                />
              </FormControl>
            </div>
          </div>
        ) : "enrichment" in content ? (
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <FormGroup row={true}>
                {enrichments.map((enrichment, i) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={enrichment === content.enrichment}
                        />
                      }
                      label={enrichment}
                      key={i}
                    />
                  );
                })}
              </FormGroup>
            </div>
          </div>
        ) : (
          <div className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <p>イベント名</p>
              <TextField
                sx={{ m: 1, width: "200px" }}
                defaultValue={content.event}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex space-x-4 justify-between">
          <Button sx={{ color: "red" }} onClick={() => alert("削除")}>
            削除
          </Button>
          <div className="flex gap-4">
            <Button onClick={handleClose} style={{ width: "100px" }}>
              キャンセル
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{ backgroundColor: "#2B7BF4", width: "100px" }}
            >
              決定
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default EditModal;
