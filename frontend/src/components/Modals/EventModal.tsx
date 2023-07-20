import { EventProps, CreateEventProps, UpdateEventProps } from "../type";
import { Modal, Box, Button, FormControl, OutlinedInput } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AppContext } from "../../pages/_app";
import { createEvent, updateEvent, deleteEvent } from "../../utils/event";

type EventModalProps = {
  title: string;
  content?: EventProps;
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  fetchData: () => void;
};

const EventModal = ({
  title,
  content,
  open,
  handleClose,
  isEdit,
  fetchData,
}: EventModalProps) => {
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
  const [event, setEvent] = useState(content?.event);

  const createData = async (content: CreateEventProps): Promise<void> => {
    await createEvent({
      startTime: content.startTime,
      endTime: content.endTime,
      event: content.event,
      date: date.format("YYYY-MM-DD"),
      polorId: id,
    });
  };
  const updateData = async (
    id: number,
    content: UpdateEventProps
  ): Promise<void> => {
    await updateEvent(id, {
      startTime: content.startTime,
      endTime: content.endTime,
      event: content.event,
    });
  };
  const deleteData = async (id: number): Promise<void> => {
    await deleteEvent(id);
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
              onChange={(e) => setStartTime(e?.format("HH:mm"))}
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>終了時刻</p>
            <TimeField
              ampm={false}
              sx={{ m: 1, width: "150px" }}
              defaultValue={dayjs(content?.endTime, "HH:mm")}
              onChange={(e) => setEndTime(e?.format("HH:mm"))}
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <p>内容</p>
            <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
              <OutlinedInput
                defaultValue={content?.event}
                onChange={(e) => setEvent(e.target.value)}
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
                  startTime === undefined ||
                  endTime === undefined ||
                  event === undefined
                ) {
                  alert("入力してください");
                  return;
                }
                try {
                  if (isEdit && content?.id) {
                    await updateData(content?.id, {
                      startTime: startTime,
                      endTime: endTime,
                      event: event,
                    });
                  } else if (!isEdit) {
                    await createData({
                      startTime: startTime,
                      endTime: endTime,
                      event: event,
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
export default EventModal;
