import React from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Card } from "@mui/material";

import DayGrid from "./DayGrid";
import { useContext, useEffect } from "react";
import { AppContext } from "@/pages/_app";

export type TimeDataProps = {
  startTime: Date;
  endTime: Date;
};

const timeData: TimeDataProps[] = [
  {
    startTime: new Date("2023-06-01T09:00:00"),
    endTime: new Date("2023-06-01T12:00:00"),
  },
  {
    startTime: new Date("2023-06-01T15:00:10"),
    endTime: new Date("2023-06-01T17:10:00"),
  },
  {
    startTime: new Date("2023-06-01T18:00:00"),
    endTime: new Date("2023-06-01T18:15:00"),
  },
];
const rows: GridRowsProp = [
  {
    id: 1,
    col1: "9:00",
    col2: "sakana",
    col3: "100g",
    col4: "あまり食べなかった",
  },
  {
    id: 2,
    col1: "16:00",
    col2: "ninzin",
    col3: "100g",
    col4: "",
  },
  {
    id: 3,
    col1: "MUI",
    col2: "sample",
    col3: "",
    col4: "sample",
  },
];
const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "時刻",
    width: 100,
    editable: true,
    headerClassName: "bg-gray-200",
  },
  {
    field: "col2",
    headerName: "食べ物",
    width: 100,
    editable: true,
    headerClassName: "bg-gray-100",
  },
  {
    field: "col3",
    headerName: "重さ",
    width: 100,
    editable: true,
    headerClassName: "bg-gray-100",
  },
  {
    field: "col4",
    headerName: "メモ",
    flex: 1,
    editable: true,
    headerClassName: "bg-gray-100",
  },
  {
    field: "actions",
    type: "actions",
    headerClassName: "bg-gray-100",
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" key={"edit"} />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        key={"delete"}
      />,
    ],
  },
];

const CalenderContent = () => {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  const { id, setId } = useContext(AppContext);

  const [totalTimeAry, setTotalTimeAry] = React.useState<number[]>([0, 0, 0]);

  // 時間の総計を計算する関数
  const calculateTotalTime = (timeData: TimeDataProps[]): number[] => {
    let totalMilliseconds = 0;

    // 各時間帯の差分を加算
    for (const time of timeData) {
      const diffInMilliseconds =
        time.endTime.getTime() - time.startTime.getTime();
      totalMilliseconds += diffInMilliseconds;
    }
    // 総計を時分秒に変換
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds];
  };
  useEffect(() => {
    setTotalTimeAry(calculateTotalTime(timeData));
  }, []);

  return (
    <div className="h-screen  p-8 mt-[73px]">
      {id}
      <div className="flex items-start justify-start">
        <div className=" w-[256px] h-[256px]">
          <DateCalendar
            value={date}
            onChange={(day) => setDate(day)}
            className="scale-[0.8] origin-top-left bg-white rounded-md p-0 "
          />
        </div>
        <div className="ml-[40px] w-full">
          <p className="text-3xl">{date?.format("YYYY年MM月DD日")}</p>
          <div className="flex items-end justify-between mt-9 mb-3">
            <p>
              常同行動検知時間{" "}
              <span className="text-3xl font-bold">
                {totalTimeAry[0]}時間{totalTimeAry[1]}分{totalTimeAry[2]}秒
              </span>
            </p>
            <p>最終検知時刻 2023-6-8 12:00</p>
          </div>
          <DayGrid timeData={timeData} />
        </div>
      </div>
      {/* <div className="border-2 w-fit px-6 py-2 cursor-pointer">＋追加</div> */}
      <p className="text-xl font-bold py-6">記録</p>
      <div>
        <Card className="w-3/4" variant="outlined">
          <div className="px-8 py-4">
            <p className="text-xl  font-bold">ごはん</p>
            <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} />
          </div>
        </Card>
      </div>
    </div>
  );
};
export default CalenderContent;
