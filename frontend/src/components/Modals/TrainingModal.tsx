import { TrainingProps, CreateTrainingProps, UpdateTrainingProps } from "../type";
import { Modal, Box, Button, FormControl, OutlinedInput } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import { createTraining, updateTraining, deleteTraining } from "../../utils/training";

type TrainingModalProps = {
  title: string;
  content?: TrainingProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const TrainingModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: TrainingModalProps) => {
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
  const [training, setTraining] = useState(content?.training);

  const createData = async (content: CreateTrainingProps): Promise<void> => {
    await createTraining({
      training: content.training,
      date: date.format("YYYY-MM-DD"),
      polorId: id,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateTrainingProps
  ): Promise<void> => {
    await updateTraining(id, {
      training: content.training,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteTraining(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>トレーニング内容</p>
            <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
              <OutlinedInput
                defaultValue={content?.training}
                onChange={(e) => setTraining(e.target.value)}
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
                if (
                  training === undefined
                ) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      training: training,
                    });
                  } else if (!isEdit) {
                    await createData({
                      training: training,
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
export default TrainingModal;
