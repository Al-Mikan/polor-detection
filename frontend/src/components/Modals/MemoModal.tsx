import { CreateMemoProps, MemoProps, UpdateMemoProps } from "../type";
import { Modal, Box, Button, TextField } from "@mui/material";
import { createMemo, updateMemo, deleteMemo } from "../../utils/memo";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";

type MemoModalProps = {
  content?: MemoProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const MemoModal = ({
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: MemoModalProps) => {
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
  const [memo, setMemo] = useState(content?.memo);

  const createData = async (content: CreateMemoProps): Promise<void> => {
    await createMemo({
      memo: content.memo,
      date: date.format("YYYY-MM-DD"),
      animalId: animalId,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateMemoProps
  ): Promise<void> => {
    await updateMemo(id, {
      memo: content.memo,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteMemo(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <TextField
            sx={{ fontFamily: "'Kalam', cursive", width: "100%" }}
            variant="outlined"
            value={memo}
            multiline
            rows={4}
            onChange={(e) => setMemo(e.target.value)}
            required
            placeholder="メモを入力してください"
          />
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
                if (memo === undefined) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      memo: memo,
                    });
                  } else if (!isEdit) {
                    await createData({
                      memo: memo,
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
export default MemoModal;
