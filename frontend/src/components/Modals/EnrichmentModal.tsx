import { EnrichmentProps } from "../type";
import {
  Modal,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

type EnrichmentModalProps = {
  title: string;
  content?: EnrichmentProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
};

const EnrichmentModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
}: EnrichmentModalProps) => {
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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>開始時刻</p>
            <TimeField
              ampm={false}
              sx={{ m: 1, width: "150px" }}
              defaultValue={dayjs(content?.startTime, "HH:mm")}
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>終了時刻</p>
            <TimeField
              ampm={false}
              sx={{ m: 1, width: "150px" }}
              defaultValue={dayjs(content?.endTime, "HH:mm")}
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>内容</p>
            <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
              <OutlinedInput defaultValue={content?.enrichment} />
            </FormControl>
          </div>
        </div>

        <div className="mt-6 flex space-x-4 justify-between">
          <Button
            sx={{ color: "red" }}
            onClick={() => alert("削除")}
            style={isEdit ? { opacity: 1 } : { opacity: 0 }}
          >
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
export default EnrichmentModal;
