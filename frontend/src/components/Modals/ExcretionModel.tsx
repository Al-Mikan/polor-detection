import {
  ExcretionProps,
  CreateExcretionProps,
  UpdateExcretionProps,
} from "../type";
import {
  Modal,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import {
  createExcretion,
  updateExcretion,
  deleteExcretion,
} from "../../utils/excretion";

type ExcretionModalProps = {
  content?: ExcretionProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const ExcretionModal = ({
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: ExcretionModalProps) => {
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
  const [number, setNumber] = useState(content?.number);
  const [status, setStatus] = useState(content?.status);

  const createData = async (content: CreateExcretionProps): Promise<void> => {
    await createExcretion({
      number: content.number,
      status: content.status,
      date: date.format("YYYY-MM-DD"),
      animalId: animalId,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateExcretionProps
  ): Promise<void> => {
    await updateExcretion(id, {
      number: content.number,
      status: content.status,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteExcretion(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>個数</p>
            <TextField
              sx={{ m: 1, width: "150px" }}
              variant="outlined"
              type="number"
              defaultValue={content?.number}
              onChange={(e) => setNumber(Number(e.target.value))}
              required
            ></TextField>
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>状態</p>
            <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
              <OutlinedInput
                defaultValue={content?.status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </FormControl>
          </div>
        </div>

        <div className={"mt-6  space-x-4 flex justify-between"}>
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

          <div className="flex gap-4 text-right ">
            <Button onClick={handleClose} style={{ width: "100px" }}>
              キャンセル
            </Button>
            <Button
              onClick={async () => {
                if (number === undefined || status === undefined) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      number: number,
                      status: status,
                    });
                  } else if (!isEdit) {
                    await createData({
                      number: number,
                      status: status,
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
export default ExcretionModal;
