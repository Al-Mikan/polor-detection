import { useContext, useEffect, useState, useRef, ChangeEvent } from "react";
import { AppContext } from "@/pages/_app";

import DayGrid from "./DayGrid";
import RecordCard from "./RecordCard";
import UploadVideo from "./UploadVideo";
import { DateCalendar } from "@mui/x-date-pickers";
import { Button, Popover } from "@mui/material";
import CageSelector from "./atoms/CageSelector";

import { cardData } from "@/data/cardData";
import { FaTrash, FaCalendar } from "react-icons/fa";

import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  jaJP,
} from "@mui/x-data-grid";

import { DetectTimeProps, AnimalProps, AnimalCageLogProps } from "./type";
import { getDetectionTimes } from "@/utils/detectionTime";

//合計値を計算
const calculateTotalTime = (
  timeData: DetectTimeProps[] | null,
  id: number,
  detectionAnimalId: number
): number[] => {
  let totalMilliseconds = 0;
  if (timeData === null || id != detectionAnimalId) return [0, 0, 0];

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
  const { animalId, setAnimalId } = useContext(AppContext);
  const { date, setDate } = useContext(AppContext);
  const { animals, setAnimals } = useContext(AppContext);

  const [totalTimeAry, setTotalTimeAry] = useState<number[]>([0, 0, 0]);
  const [detectionData, setDetectionData] = useState<DetectTimeProps[]>([]);
  const [userSelectedModalOpen, setUserSelectedModalOpen] = useState(false);
  const [animalCageLog, setAnimalCageLog] = useState<AnimalCageLogProps[]>([]);

  const fetchDetectionTime = async () => {
    try {
      const detectionData = await getDetectionTimes(date.format("YYYY-MM-DD"));
      const detectionAnimal = [
        {
          animalId: 1,
        },
      ];
      setDetectionData(detectionData);
      if (detectionAnimal.length !== 0) {
        const animalId = detectionAnimal[0].animalId;
        const animalObj = animals.find((item) => item.id === animalId);
      } else {
        setUserSelectedModalOpen(true);
      }
      const totalary = calculateTotalTime(
        detectionData,
        animalId,
        detectionAnimal[0].animalId
      );
      setTotalTimeAry(totalary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetectionTime();
  }, [animalId, date]);
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
      headerName: "アップロード時間",
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

  // カレンダーの表示状態を管理するための状態
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const timeData: DetectTimeProps[] = [
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const pop_id = open ? "simple-popover" : undefined;

  const handlePopOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-8">
      <p className=" text-3xl font-bold mb-4">行動記録</p>

      <div className=" bg-white p-6 rounded-3xl shadow-md">
        <div className=" mb-12 h-[300px] ">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold ">
                {date?.format("YYYY年MM月DD日")}
              </p>
              <Button
                onClick={handlePopOpen}
                variant="contained"
                className="p-4 bg-[#342B43] hover:bg-[#000000]  hover:shadow-xl text-xl rounded-full"
              >
                <FaCalendar />
              </Button>
              <Popover
                id={pop_id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="w-[256px] h-[270px]">
                  <DateCalendar
                    value={date}
                    onChange={(day) => {
                      day && setDate(day);
                      handlePopClose();
                    }}
                    className="scale-[0.8] origin-top-left rounded-md p-0 text-[#362B44]"
                  />
                </div>
              </Popover>
            </div>
          </div>
          <div className="w-full  h-[300px] px-2 ">
            <CageSelector
              animalId={animalId}
              date={date.format("YYYY-MM-DD")}
            />
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
        {/* <div className=" flex items-center justify-center py-4">
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
        </div> */}

        <div className="flex items-center justify-center p-4 w-full py-6">
          <div className="w-fit ">
            <DataGrid
              rows={rows}
              columns={columns}
              localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
              hideFooter
              className="h-[300px] w-[700px]"
              sx={styles.grid}
              onRowDoubleClick={(params) => {
                setVideoModalOpen(true), setSelectedVideo(params.row.time);
              }}
            />
          </div>
        </div>
      </div>
      <div className=" rounded mt-16">
        <div className="flex gap-x-10  gap-y-10 flex-wrap mb-12">
          {cardData.map((card, index) => (
            <RecordCard
              key={index}
              recordType={card.recordType}
              icon={card.icon}
              className={card.className}
            />
          ))}
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
    </div>
  );
};
export default CalenderContent;
