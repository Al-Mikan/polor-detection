import { ExpropriationProps, CreateExpropriationProps, UpdateExpropriationProps } from "../type";
import { Modal, Box, Button, FormControl, OutlinedInput,TextField } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import { createExpropriation, updateExpropriation, deleteExpropriation } from "../../utils/expropriation";

type ExpropriationModalProps = {
  title: string;
  content?: ExpropriationProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const ExpropriationModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: ExpropriationModalProps) => {
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
  const [expropriation, setExpropriation] = useState(content?.expropriation||0);

  const createData = async (content: CreateExpropriationProps): Promise<void> => {
    await createExpropriation({
      expropriation: content.expropriation,
      date: date.format("YYYY-MM-DD"),
      polarId: id,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateExpropriationProps
  ): Promise<void> => {
    await updateExpropriation(id, {
      expropriation: content.expropriation,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteExpropriation(id);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>収用回数</p>
            <TextField
              sx={{ m: 1, width: "150px" }}
              variant="outlined"
              type="number"
              defaultValue={content?.expropriation}
              onChange={(e) => setExpropriation(Number(e.target.value))}
              required
            ></TextField>
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
                  expropriation === undefined
                ) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      expropriation: expropriation,
                    });
                  } else if (!isEdit) {
                    await createData({
                      expropriation: expropriation,
                      date: date.format("YYYY-MM-DD"),
                      polarId: id,
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
export default ExpropriationModal;
