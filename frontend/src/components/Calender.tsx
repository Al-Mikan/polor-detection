import React from "react";
import { useContext, useEffect, useState } from "react";
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
import { DetectionTimeProps, polorProps } from "./type";
import { getDetectionTimes } from "@/utils/detectionTime";
import { getDetectionPolors } from "@/utils/detectionPolor";
import DetectionPolorModal from "./Modals/DetectionPolorModal";

//合計値を計算
const calculateTotalTime = (
  timeData: DetectionTimeProps[] | null,
  id: number,
  detectionPolorId: number
): number[] => {
  let totalMilliseconds = 0;
  if (timeData === null || id != detectionPolorId) return [0, 0, 0];

  // 各時間帯の差分を加算
  for (const time of timeData) {
    const time1 = new Date("1970-01-01 " + time.endTime).getTime();
    const time2 = new Date("1970-01-01 " + time.startTime).getTime();
    const diffInMilliseconds = time1 - time2;
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
  const { id, setId } = useContext(AppContext);
  const { date, setDate } = useContext(AppContext);
  const { polors, setPolors } = useContext(AppContext);

  const [totalTimeAry, setTotalTimeAry] = useState<number[]>([0, 0, 0]);
  const [detectionData, setDetectionData] = useState<DetectionTimeProps[]>([]);
  const [detectionPolor, setDetectionPolor] = useState<polorProps>(
    {} as polorProps
  );
  const [userSelectedModalOpen, setUserSelectedModalOpen] = useState(false);

  const fetchDetectionTime = async () => {
    try {
      const detectionData = await getDetectionTimes(date.format("YYYY-MM-DD"));
      const detectionPolor = await getDetectionPolors(
        date.format("YYYY-MM-DD")
      );
      setDetectionData(detectionData);
      if (detectionPolor.length !== 0) {
        const polorId = detectionPolor[0].polorId;
        const polorObj = polors.find((item) => item.id === polorId);
        setDetectionPolor(polorObj as polorProps);
      } else {
        setUserSelectedModalOpen(true);
      }
      const totalary = calculateTotalTime(
        detectionData,
        id,
        detectionPolor[0].polorId
      );
      setTotalTimeAry(totalary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetectionTime();
  }, [id, date]);

  return (
    <div className="p-8">
      <div className="flex items-start justify-start bg-white p-6 rounded">
        <div className=" w-[256px] h-[256px]">
          <DateCalendar
            value={date}
            onChange={(day) => day && setDate(day)}
            className="scale-[0.8] origin-top-left bg-white rounded-md p-0 "
          />
        </div>
        <div className="ml-[40px] w-full">
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-3xl">{date?.format("YYYY年MM月DD日")}</p>
              <div className="border-2 border-blue-400 p-1 text-xs leading-none mt-2">
                {detectionPolor?.name}を検知しています
              </div>
            </div>

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
          <DayGrid timeData={detectionData} />
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
      <DetectionPolorModal
        open={userSelectedModalOpen}
        handleClose={() => {
          setUserSelectedModalOpen(false);
        }}
        fetchData={fetchDetectionTime}
      />
    </div>
  );
};
export default CalenderContent;
