import {
  CreateWakeUpTimeProps,
  WakeUpTimeProps,
  UpdateWakeUpTimeProps,
} from "../type";
import {
  Modal,
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  createWakeUpTime,
  updateWakeUpTime,
  deleteWakeUpTime,
} from "../../utils/wakeUpTime";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

type WakeUpTimeModalProps = {
  content?: WakeUpTimeProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const WakeUpTimeModal = ({
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: WakeUpTimeModalProps) => {
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
  const { date, setDate } = useContext(AppContext);
  const { animalId, setAnimalId } = useContext(AppContext);
  const [wakeUpTime, setWakeUpTime] = useState(content?.time);

  const createData = async (content: CreateWakeUpTimeProps): Promise<void> => {
    await createWakeUpTime({
      time: content.time,
      date: date.format("YYYY-MM-DD"),
      animalId: animalId,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateWakeUpTimeProps
  ): Promise<void> => {
    await updateWakeUpTime(id, {
      time: content.time,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteWakeUpTime(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>起床時間</p>
            <TimeField
              ampm={false}
              sx={{ m: 1, width: "150px" }}
              defaultValue={dayjs(content?.time, "HH:mm")}
              onChange={(e) => setWakeUpTime(e?.format("HH:mm"))}
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-4 justify-between">
          <Button
            sx={{ color: "red" }}
            onClick={async () => {
              if (content?.id) {
                await deleteData(content?.id);
                fetchData();
              }
              handleClose();
            }}
            style={isEdit ? { opacity: 1 } : { opacity: 0 }}
          >
            削除
          </Button>

          <div className="flex gap-4">
            <Button onClick={handleClose} style={{ width: "100px" }}>
              キャンセル
            </Button>
            <Button
              onClick={async () => {
                if (wakeUpTime === undefined) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      time: wakeUpTime,
                    });
                  } else if (!isEdit) {
                    await createData({
                      time: wakeUpTime,
                      date: date.format("YYYY-MM-DD"),
                      animalId: animalId,
                    });
                  } else {
                    alert("エラー");
                    return;
                  }

                  fetchData();
                  handleClose();
                } catch (error) {
                  console.error("エラーが発生しました", error);
                }
              }}
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
export default WakeUpTimeModal;
