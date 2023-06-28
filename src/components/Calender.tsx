import React from "react";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AppContext } from "@/pages/_app";

import DayGrid from "./DayGrid";
import RecordCard from "./Card/RecordCard";
import EventCard from "./Card/EventCard";
import AddModal from "./AddModal";

import { DateCalendar } from "@mui/x-date-pickers";
import { Button } from "@mui/material";

import {
  timeData,
  mealRows,
  temperatureRows,
  enrichments,
  events,
} from "@/data/sample";
import { TimeDataProps } from "./type";

const mealHead = ["時刻", "食べ物", "重さ(g)"];

const temperatureHead = ["時刻", "気温(℃)"];

//idと日付からデータを取得
const getTimeDataByIdAndDate = (
  id: number,
  date: Date,
  timeData: TimeDataProps[]
): TimeDataProps[] | null => {
  const targetData = timeData.filter(
    (data) =>
      data.id === id &&
      data.startTime.getFullYear() === date.getFullYear() &&
      data.startTime.getMonth() === date.getMonth() &&
      data.startTime.getDate() === date.getDate()
  );
  return targetData ? targetData : null;
};
//合計値を計算
const calculateTotalTime = (timeData: TimeDataProps[] | null): number[] => {
  let totalMilliseconds = 0;
  if (timeData === null) return [0, 0, 0];

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

const CalenderContent = () => {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  const { id, setId } = useContext(AppContext);

  const [totalTimeAry, setTotalTimeAry] = useState<number[]>([0, 0, 0]);
  const [isAddmodalOpen, setisAddmodalOpen] = useState<boolean>(false);
  const [targetData, setTargetData] = useState<TimeDataProps[] | null>(null);
  // 時間の総計を計算する関数

  useEffect(() => {
    if (date === null) return;
    const targetData = getTimeDataByIdAndDate(id, date?.toDate(), timeData);
    setTargetData(targetData);
    setTotalTimeAry(calculateTotalTime(targetData));
  }, [id, date]);

  return (
    <div className="p-8">
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
          <div className="flex justify-between">
            <p className="text-3xl">{date?.format("YYYY年MM月DD日")}</p>
            <Button>動画を確認する</Button>
          </div>

          <div className="flex items-end justify-between mt-9 mb-3">
            <p>
              常同行動検知時間
              <span className="text-3xl font-bold">
                {totalTimeAry[0]}時間{totalTimeAry[1]}分{totalTimeAry[2]}秒
              </span>
            </p>
            <p>最終集計時刻 2023-6-8 12:00</p>
          </div>
          <DayGrid timeData={targetData} />
        </div>
      </div>
      {/* <div className="border-2 w-fit px-6 py-2 cursor-pointer">＋追加</div> */}
      <div className=" mt-10 rounded p-6">
        <div className="flex justify-between h-fit align-bottom mb-6">
          <p className="text-2xl font-bold ">本日の記録</p>
          <Button
            variant="contained"
            onClick={() => {
              setisAddmodalOpen(true);
            }}
            className="px-8 font-bold text-lg"
            style={{ backgroundColor: "#2B7BF4" }}
          >
            ＋追加
          </Button>
          <AddModal
            open={isAddmodalOpen}
            handleClose={() => {
              setisAddmodalOpen(false);
            }}
          />
        </div>
        <div className=" flex flex-wrap justify-between gap-6">
          <RecordCard
            heads={temperatureHead}
            rows={temperatureRows}
            title="気温"
          />
          <RecordCard heads={mealHead} rows={mealRows} title="食事" />
          <EventCard title="エンリッチメント" content={enrichments} />
          <EventCard title="イベント" content={events} />
        </div>
      </div>
    </div>
  );
};
export default CalenderContent;
