import { Box } from "@mui/material";

import * as React from "react";
import { Tooltip } from "@mui/material";
import { DetectionTimeProps } from "@/components/type";
import { useContext } from "react";
import { AppContext } from "@/pages/_app";

type DayGridProps = {
  timeData: DetectionTimeProps[];
};

const DayGrid = ({ timeData }: DayGridProps) => {
  const { id, setId } = useContext(AppContext);
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
            if (time.cageId === id) {
              const start = new Date("1970-01-01 " + time.startTime);
              const end = new Date("1970-01-01 " + time.endTime);

              const startTime = start.getHours();
              const startMinutes = start.getMinutes();
              const startSeconds = start.getSeconds();
              const endTime = end.getHours();
              const endMinutes = end.getMinutes();
              const endSeconds = end.getSeconds();
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
                <div key={index}>
                  <Tooltip title={timeStr}>
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundColor: "#F09783",
                        width: `${width}%`,
                        height: "120px",
                        left: `${startPosition}%`,
                        top: "0px",
                      }}
                    ></Box>
                  </Tooltip>
                </div>
              );
            }
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
