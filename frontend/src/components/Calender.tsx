import { useContext, useEffect, useState, useRef, ChangeEvent } from "react";
import { AppContext } from "@/pages/_app";

import DayGrid from "./DayGrid";
import RecordCard from "./RecordCard";
import UploadVideo from "./UploadVideo";
import { DateCalendar } from "@mui/x-date-pickers";
import { Button, Divider } from "@mui/material";

import {
  FaThermometerHalf,
  FaUtensils,
  FaLeaf,
  FaCalendarDay,
  FaTrash,
  FaPen,
} from "react-icons/fa";

import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  jaJP,
} from "@mui/x-data-grid";

import { DetectionTimeProps, PolorProps, PolorCageLogProps } from "./type";
import { getDetectionTimes } from "@/utils/detectionTime";
import { getDetectionPolors } from "@/utils/detectionPolor";

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
  const [userSelectedModalOpen, setUserSelectedModalOpen] = useState(false);
  const [polorCageLog, setPolorCageLog] = useState<PolorCageLogProps[]>([]);

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
  const rows: GridRowsProp = [
    {
      id: 1,
      time: "9:00-10:00",
      filename: "91_2020_09_28_09.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
    {
      id: 2,
      time: "10:00-11:00",
      filename: "91_2020_09_28_10.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
    {
      id: 3,
      time: "11:00-12:00",
      filename: "91_2020_09_28_11.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
    {
      id: 4,
      time: "12:00-13:00",
      filename: "91_2020_09_28_12.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
    {
      id: 5,
      time: "13:00-14:00",
      filename: "91_2020_09_28_13.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
    {
      id: 6,
      time: "14:00-15:00",
      filename: "91_2020_09_28_14.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
    {
      id: 7,
      time: "15:00-16:00",
      filename: "91_2020_09_28_15.mp4",
      uploadtime: "2021-10-01 12:00:00",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "time",
      headerName: "時間",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "filename",
      headerName: "ファイル名",
      align: "center",
      width: 220,
      headerAlign: "center",
    },
    {
      field: "uploadtime",
      headerName: "更新時間",
      align: "center",
      width: 220,
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 80,
      getActions: () => {
        return [
          <GridActionsCellItem
            icon={<FaTrash />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            color="inherit"
            key={"delete"}
          />,
        ];
      },
    },
  ];
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileUploaded = event.target.files[0];
      // ここでファイルの処理を行うことができます
    }
  };
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const styles = {
    grid: {
      ".MuiDataGrid-columnHeaders": {
        backgroundColor: "#F5F4F7",
      },
      "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
        outline: "none !important",
      },
    },
  };

  const timeData: DetectionTimeProps[] = [
    {
      id: 1,
      cageId: 1,
      startTime: "07:00:00",
      endTime: "07:12:00",
    },
    {
      id: 1,
      cageId: 1,
      startTime: "08:20:00",
      endTime: "08:45:00",
    },
    {
      id: 2,
      cageId: 1,
      startTime: "09:00:00",
      endTime: "11:00:00",
    },
    {
      id: 3,
      cageId: 1,
      startTime: "15:00:00",
      endTime: "15:05:00",
    },
    {
      id: 4,
      cageId: 1,
      startTime: "17:00:00",
      endTime: "18:20:00",
    },
    {
      id: 5,
      cageId: 2,
      startTime: "18:32:00",
      endTime: "18:40:00",
    },
  ];

  return (
    <div className="p-8">
      <p className=" text-3xl font-bold mb-4">行動記録</p>

      <div className=" bg-white p-6 rounded-3xl shadow-md">
        <div className=" mb-12 flex h-[300px] ">
          <div className="flex flex-col justify-between items-center">
            <p className="text-3xl font-bold mt-4">
              {date?.format("YYYY年MM月DD日")}
            </p>
            <div className=" w-[256px] h-[220px] ">
              <DateCalendar
                value={date}
                onChange={(day) => day && setDate(day)}
                className="scale-[0.8] origin-top-left  rounded-md p-0 text-[#362B44] "
              />
            </div>
          </div>
          <Divider
            orientation="vertical"
            flexItem
            className="h-[300px]  mx-4"
          ></Divider>
          <div className="w-full flex flex-col justify-between  h-[300px] px-2 ">
            <div className="flex justify-end">
              <div className=" p-2 flex items-center gap-x-1">
                <p className="bg-[#47CAD9] text-white rounded-full  px-2 py-1">
                  ゲージ 1
                </p>
                <p>に入っています</p>
              </div>
            </div>
            <div>
              <div className="flex items-center  ">
                <p className=" mr-auto">
                  常同行動検知時間　
                  <span className="text-3xl font-bold">
                    {/* {totalTimeAry[0]}時間{totalTimeAry[1]}分{totalTimeAry[2]}秒
                     */}
                    3時間42分30秒
                  </span>
                </p>
                <div className="flex gap-x-2 items-end">
                  <p>前日</p>
                  <div className="flex gap-x-1 items-center text-2xl text-red-800">
                    <FaArrowTrendUp />
                    <p className="">12%</p>
                  </div>
                  <p className="ml-2">先週平均</p>
                  <div className="flex gap-x-1 items-center text-2xl  text-green-900">
                    <FaArrowTrendDown />
                    <p className="">9%</p>
                  </div>
                </div>
              </div>
              <DayGrid timeData={timeData} />
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center py-4">
          <Button
            onClick={handleClick}
            variant="contained"
            className="px-12 py-4 bg-[#342B43] hover:bg-[#000000]  hover:shadow-xl text-xl rounded-full"
          >
            <p>動画をアップロード</p>
          </Button>
          <input
            type="file"
            onChange={handleChange}
            accept=".mp4"
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
        <div>
          <p className="flex justify-center text-sm text-gray-500">
            mp4ファイルをアップロードすることで、常同行動検知システムが動作します。
          </p>
        </div>

        <div className="flex items-center justify-center p-4 w-full py-6">
          <div className="w-fit ">
            <DataGrid
              rows={rows}
              columns={columns}
              localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
              hideFooter
              className="h-[300px]"
              sx={styles.grid}
              onRowDoubleClick={(params) => {
                setVideoModalOpen(true), setSelectedVideo(params.row.time);
              }}
            />
          </div>
        </div>
      </div>

      <div className=" rounded ">
        <div className="flex gap-x-10 my-10">
          <RecordCard
            title="気温"
            icon={<FaThermometerHalf />}
            className="w-[500px] shadow-md"
          />
          <RecordCard
            title="エンリッチメント"
            icon={<FaLeaf />}
            className="w-full shadow-md"
          />
        </div>
        <div className="flex gap-x-10">
          <RecordCard
            title="食事"
            icon={<FaUtensils />}
            className="w-[500px] shadow-md"
          />
          <RecordCard
            title="イベント"
            icon={<FaCalendarDay />}
            className="w-full shadow-md"
          />
        </div>
      </div>
      <UploadVideo
        video_path="./1.mp4"
        open={videoModalOpen}
        handleClose={() => {
          setVideoModalOpen(false);
        }}
        title={selectedVideo}
      />
      {/* <DetectionPolorModal
        open={userSelectedModalOpen}
        handleClose={() => {
          setUserSelectedModalOpen(false);
        }}
        fetchData={fetchDetectionTime}
      /> */}
    </div>
  );
};
export default CalenderContent;
