import {
  CreateTemperatureProps,
  TemperatureProps,
  UpdateTemperatureProps,
} from "../type";
import { Modal, Box, Button, TextField } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import { createTemperature, updateTemperature } from "../../utils/temperature";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";

type TemperatureModalProps = {
  title: string;
  content?: TemperatureProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const TemperatureModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: TemperatureModalProps) => {
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
  const { id, setId } = useContext(AppContext);
  const [time, setTime] = useState(content?.time);
  const [temperature, setTemperature] = useState(content?.temperature);

  const createData = async (content: CreateTemperatureProps): Promise<void> => {
    await createTemperature({
      time: content.time,
      temperature: content.temperature,
      date: date.format("YYYY-MM-DD"),
      polorId: id,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateTemperatureProps
  ): Promise<void> => {
    await updateTemperature(id, {
      time: content.time,
      temperature: content.temperature,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>時刻</p>
            <TimeField
              ampm={false}
              sx={{ m: 1, width: "150px" }}
              defaultValue={dayjs(content?.time, "HH:mm")}
              onChange={(e) => setTime(e?.format("HH:mm"))}
              required
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>気温</p>
            <TextField
              sx={{ m: 1, width: "150px" }}
              variant="outlined"
              type="number"
              defaultValue={content?.temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              required
            ></TextField>
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
              onClick={async () => {
                if (time === undefined || temperature === undefined) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      time: time,
                      temperature: temperature,
                    });
                  } else if (!isEdit) {
                    await createData({
                      time: time,
                      temperature: temperature,
                      date: date.format("YYYY-MM-DD"),
                      polorId: id,
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
export default TemperatureModal;
