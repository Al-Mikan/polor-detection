import React from "react";
import { useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AppContext } from "@/pages/_app";

import DayGrid from "./DayGrid";
import RecordCard from "./RecordCard";

import { DateCalendar } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import {
  FaThermometerHalf,
  FaUtensils,
  FaLeaf,
  FaCalendarDay,
} from "react-icons/fa";

import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

import { timeData } from "@/data/sample";
import { TimeDataProps } from "./type";

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
  const { date, setDate } = useContext(AppContext);

  const [totalTimeAry, setTotalTimeAry] = useState<number[]>([0, 0, 0]);
  const [targetData, setTargetData] = useState<TimeDataProps[] | null>(null);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [unRegisterdDays, setUnRegisterdDays] = useState([12, 13, 14]);

  //もし、名前がdbになかったらmodalを出す

  useEffect(() => {
    setTargetData(timeData);
    setTotalTimeAry(calculateTotalTime(targetData));
  }, []);

  const ServerDay = (
    props: PickersDayProps<Dayjs> & {
      highlightedDays?: number[];
      unRegisterdDays?: number[];
    }
  ) => {
    const {
      highlightedDays = [],
      unRegisterdDays = [],
      day,
      outsideCurrentMonth,
      ...other
    } = props;

    const isSelectedDay =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;
    const isUnRegisterdDay =
      !props.outsideCurrentMonth &&
      unRegisterdDays.indexOf(props.day.date()) >= 0;

    return (
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        className={
          isSelectedDay ? "bg-red-300" : isUnRegisterdDay ? " bg-gray-300" : ""
        }
      />
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-start bg-white p-6 rounded">
        <div className=" w-[256px] h-[256px]">
          <DateCalendar
            value={date}
            onChange={(day) => day && setDate(day)}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
                unRegisterdDays,
              } as any,
            }}
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
      <div className=" mt-10 rounded p-6">
        <div className="flex justify-between h-fit align-bottom mb-6">
          <p className="text-2xl font-bold ">本日の記録</p>
        </div>
        <div className="flex gap-x-10 my-10">
          <RecordCard
            title="気温"
            icon={<FaThermometerHalf />}
            className="w-[500px]"
          />
          <RecordCard
            title="エンリッチメント"
            icon={<FaLeaf />}
            className="w-full"
          />
        </div>
        <div className="flex gap-x-10">
          <RecordCard
            title="食事"
            icon={<FaUtensils />}
            className="w-[500px]"
          />
          <RecordCard
            title="イベント"
            icon={<FaCalendarDay />}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
export default CalenderContent;
