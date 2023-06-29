import { Box } from "@mui/material";

import * as React from "react";
import { Tooltip } from "@mui/material";
import { TimeDataProps } from "@/components/type";

type DayGridProps = {
  timeData: TimeDataProps[] | null;
};

const DayGrid = ({ timeData }: DayGridProps) => {
  const commonStyles = {
    width: "100%",
    opacity: 0.2,
  };

  const timeAry = [
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];
  //表示している時間の幅
  const timeWidth = 15 * 60;
  return (
    <div className="w-full">
      <div className="px-4  ">
        <div className="bg-white flex relative  h-[120px]">
          <Box sx={{ ...commonStyles, border: 1 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          <Box sx={{ ...commonStyles, border: 1, borderLeft: 0 }}></Box>
          {timeData?.map((time, index) => {
            const startTime = time.startTime.getHours();
            const startMinutes = time.startTime.getMinutes();
            const startSeconds = time.startTime.getSeconds();
            const endTime = time.endTime.getHours();
            const endMinutes = time.endTime.getMinutes();
            const endSeconds = time.endTime.getSeconds();
            const width =
              (((endTime - startTime) * 60 + endMinutes - startMinutes) /
                timeWidth) *
              100;
            const oneMinuteWidth = 100 / timeWidth;
            const startPosition =
              ((startTime - 5) * 60 + startMinutes) * oneMinuteWidth;
            const timeStr =
              startTime.toString().padStart(2, "0") +
              ":" +
              startMinutes.toString().padStart(2, "0") +
              ":" +
              startSeconds.toString().padStart(2, "0") +
              " - " +
              endTime.toString().padStart(2, "0") +
              ":" +
              endMinutes.toString().padStart(2, "0") +
              ":" +
              endSeconds.toString().padStart(2, "0");
            return (
              <>
                <Tooltip title={timeStr}>
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      backgroundColor: "#2B7BF4",
                      width: `${width}%`,
                      height: "120px",
                      left: `${startPosition}%`,
                      top: "0px",
                    }}
                  ></Box>
                </Tooltip>
              </>
            );
          })}
        </div>
      </div>
      <div className=" flex justify-between">
        {timeAry.map((time, i) => {
          return (
            <div key={i}>
              <p className="text-xs text-gray-500">{time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DayGrid;
