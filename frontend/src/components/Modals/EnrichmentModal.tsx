import { Modal, Box, Button, FormControl, OutlinedInput } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import {
  createEnrichment,
  updateEnrichment,
  deleteEnrichment,
} from "../../utils/enrichment";
import {
  CreateEnrichmentProps,
  UpdateEnrichmentProps,
  EnrichmentProps,
} from "../type";

type EnrichmentModalProps = {
  title: string;
  content?: EnrichmentProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const EnrichmentModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
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
  const { date, setDate } = useContext(AppContext);
  const { id, setId } = useContext(AppContext);
  const [startTime, setStartTime] = useState(content?.startTime);
  const [endTime, setEndTime] = useState(content?.endTime);
  const [enrichment, setEnrichment] = useState(content?.enrichment);

  const createData = async (content: CreateEnrichmentProps): Promise<void> => {
    await createEnrichment({
      startTime: content.startTime,
      endTime: content.endTime,
      enrichment: content.enrichment,
      date: date.format("YYYY-MM-DD"),
      polorId: id,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateEnrichmentProps
  ): Promise<void> => {
    await updateEnrichment(id, {
      startTime: content.startTime,
      endTime: content.endTime,
      enrichment: content.enrichment,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteEnrichment(id);
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
              onChange={(e) => setStartTime(e?.format("HH:mm"))}
              defaultValue={dayjs(content?.startTime, "HH:mm")}
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>終了時刻</p>
            <TimeField
              ampm={false}
              sx={{ m: 1, width: "150px" }}
              onChange={(e) => setEndTime(e?.format("HH:mm"))}
              defaultValue={dayjs(content?.endTime, "HH:mm")}
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>内容</p>
            <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
              <OutlinedInput
                defaultValue={content?.enrichment}
                onChange={(e) => setEnrichment(e.target.value)}
              />
            </FormControl>
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
                if (
                  startTime === undefined ||
                  endTime === undefined ||
                  enrichment === undefined
                ) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      startTime: startTime,
                      endTime: endTime,
                      enrichment: enrichment,
                    });
                  } else if (!isEdit) {
                    await createData({
                      startTime: startTime,
                      endTime: endTime,
                      enrichment: enrichment,
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
export default EnrichmentModal;
