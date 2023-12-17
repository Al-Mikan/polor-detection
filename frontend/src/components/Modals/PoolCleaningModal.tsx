import {
  CreatePoolCleaningProps,
  PoolCleaningProps,
  UpdatePoolCleaningProps,
} from "../type";
import { Modal, Box, Button, TextField,Switch,FormControlLabel } from "@mui/material";
import {
  createPoolCleaning,
  updatePoolCleaning,
  deletePoolCleaning,
} from "../../utils/poolCleaning";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";

type PoolCleaningModalProps = {
  title: string;
  content?: PoolCleaningProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const PoolCleaningModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: PoolCleaningModalProps) => {
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
  const [poolCleaning, setPoolCleaning] = useState(content?.poolCleaning || false);

  const createData = async (content: CreatePoolCleaningProps): Promise<void> => {
    await createPoolCleaning({
      poolCleaning: content.poolCleaning,
      date: date.format("YYYY-MM-DD"),
      polarId: id,
    });
  };
  const updateData = async (
    id: number,
    content: UpdatePoolCleaningProps
  ): Promise<void> => {
    await updatePoolCleaning(id, {
        poolCleaning: content.poolCleaning,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deletePoolCleaning(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <p className=" text-2xl font-bold">
          {isEdit ? "記録の編集・削除" : "記録の追加"}
        </p>
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-6">
            <p>プール掃除</p>
            <FormControlLabel
              control={
                <Switch checked={content?.poolCleaning}
                  onChange={(e) => setPoolCleaning(Boolean(e.target.value))}
              />
              }
            label="済み" 
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
                if (poolCleaning === undefined) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      poolCleaning: poolCleaning,
                    });
                  } else if (!isEdit) {
                      await createData({
                        poolCleaning: poolCleaning,
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
export default PoolCleaningModal;
