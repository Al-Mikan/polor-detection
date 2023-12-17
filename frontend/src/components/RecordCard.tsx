import React, { ReactNode } from "react";
import MealModal from "./Modals/MealModal";
import TemperatureModal from "./Modals/TemperatureModal";
import EnrichmentModal from "./Modals/EnrichmentModal";
import EventModal from "./Modals/EventModal";
import PoolCleaningModal from "./Modals/PoolCleaningModal";
import ExcretionModal from "./Modals/ExcretionModel";
import ExpropriationModal from "./Modals/ExpropriationModal";
import MemoModal from "./Modals/MemoModal";
import TrainingModal from "./Modals/TrainingModal";
import WakeUpTimeModal from "./Modals/WakeUpTimeModal";
import WaterModal from "./Modals/WaterModal";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  MealProps,
  TemperatureProps,
  EnrichmentProps,
  EventProps,
  ExcretionProps,
  ExpropriationProps,
  MemoProps,
  PoolCleaningProps,
  TrainingProps,
  WakeUpTimeProps,
  WaterProps
} from "./type";
import { getTemperatures } from "@/utils/temperature";
import { getMeals } from "@/utils/meal";
import { getEnrichments } from "@/utils/enrichment";
import { getEvents } from "@/utils/event";
import { getExpropriation } from "@/utils/expropriation";
import { getExcretion } from "@/utils/excretion";
import { getWakeUpTime } from "@/utils/wakeUpTime";
import { getTraining } from "@/utils/training";
import { getWater } from "@/utils/water";
import { getMemo } from "@/utils/memo";

import { useEffect, useContext } from "react";
import { AppContext } from "@/pages/_app";
import TemperatureCardContent from "./CardContent/TemperatureCardContent";
import MealCardContent from "./CardContent/MealCardContent";
import EnrichmentCardContent from "./CardContent/EnrichmentCardContent";
import EventCardContent from "./CardContent/EventCardContent";
import PoolCleaningCardContent from "./CardContent/PoolCleaningCardContent"
import ExcretionCardContent from "./CardContent/ExcretionCardContent";
import ExpropriationCardContent from "./CardContent/ExpropriationCardContent";
import MemoCardContent from "./CardContent/MemoCardContent";
import TrainingCardContent from "./CardContent/TrainingCardContent";
import WakeUpTimeCardContent from "./CardContent/WakeUpTimeCardContent";
import WaterCardContent from "./CardContent/WaterCardContent";
import { getPoolCleaning } from "@/utils/poolCleaning";


type RecordCardProps = {
  title: string;
  icon: ReactNode;
  className?: string;
};


const RecordCard = ({ title, icon, className }: RecordCardProps) => {
  const { date, setDate } = useContext(AppContext);
  const { id, setId } = useContext(AppContext);

  const [addmodalOpen, setAddmodalOpen] = useState(false);

  const [temperatureData, setTemperatureData] = useState<TemperatureProps[]>(
    []
  );
  const [mealData, setMealData] = useState<MealProps[]>([]);
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentProps[]>([]);
  const [eventData, setEventData] = useState<EventProps[]>([]);
  const [expropriation, setExpropriation] = useState<ExpropriationProps>({} as ExpropriationProps);
  const [memo, setMemo] = useState<MemoProps>({} as MemoProps);
  const [poolCleaning, setPoolCleaning] = useState<PoolCleaningProps>({} as PoolCleaningProps);
  const [wakeUpTime, setWakeUpTime] = useState<WakeUpTimeProps>({} as WakeUpTimeProps);
  const [water, setWater] = useState<WaterProps>({} as WaterProps);
  const [training, setTraining] = useState<TrainingProps[]>([]);
  const [excretion, setExcretion] = useState<ExcretionProps>({} as ExcretionProps);


const fetchData = async (dataType:string) => {
  try {
    let data;
    switch (dataType) {
      case 'temperature':
        data = await getTemperatures(date.format("YYYY-MM-DD"), id);
        setTemperatureData(data);
        break;
      case 'meal':
        data = await getMeals(date.format("YYYY-MM-DD"), id);
        setMealData(data);
        break;
      case 'enrichment':
        data = await getEnrichments(date.format("YYYY-MM-DD"), id);
        setEnrichmentData(data);
        break;
      case 'event':
        data = await getEvents(date.format("YYYY-MM-DD"), id);
        setEventData(data);
        break;
      case 'expropriation':
        data = await getExpropriation(date.format("YYYY-MM-DD"), id);
        setExpropriation(data);
        break;
      case 'memo':
        data = await getMemo(date.format("YYYY-MM-DD"), id);
        setMemo(data);
        break;
      case 'poolCleaning':
        data = await getPoolCleaning(date.format("YYYY-MM-DD"), id);
        setPoolCleaning(data);
        break;
      case 'wakeUpTime':
        data = await getWakeUpTime(date.format("YYYY-MM-DD"), id);
        setWakeUpTime(data);
        break;
      case 'water':
        data = await getWater(date.format("YYYY-MM-DD"), id);
        setWater(data);
        break;
      case 'training':
        data = await getTraining(date.format("YYYY-MM-DD"), id);
        setTraining(data);
        break;
      case 'excretion':
        data = await getExcretion(date.format("YYYY-MM-DD"), id);
        setExcretion(data);
        break;
      // 他のデータに対するケースも同様に設定
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchData('temperature');
  fetchData('meal');
  fetchData('event');
  fetchData('enrichment');
  fetchData('expropriation');
  fetchData('memo');
  fetchData('poolCleaning');
  fetchData('wakeUpTime');
  fetchData('water');
  fetchData('training');
  fetchData('excretion');
}, [date, id]);
  return (
    <div className={`bg-white px-6 py-6 rounded-3xl   ${className}`}>
      <div className="flex justify-between mb-2">
        <p className="text-xl  text-gray-700 font-bold  flex items-center">
          {icon}
          {title}
        </p>
        <Button
          variant="contained"
          onClick={() => {
            setAddmodalOpen(true);
          }}
          className="px-4 text-md  rounded-full"
          style={{ backgroundColor: "#F19784" }}
        >
          ＋追加
        </Button>
      </div>

      <AddModal
        title={title}
        open={addmodalOpen}
        handleClose={() => {
          setAddmodalOpen(false);
        }}
        isEdit={false}
        fetchData={()=>fetchData(title)}
      />
      {title === "気温" ? (
        <TemperatureCardContent
          temperature={temperatureData}
          fetchData={()=>fetchData("temperature")}
        />
      ) : title === "イベント" ? (
        <EventCardContent events={eventData} fetchData={()=>fetchData("event")} />
      ) : title === "エンリッチメント" ? (
        <EnrichmentCardContent
          enrichments={enrichmentData}
          fetchData={()=>fetchData("enrichment")}
        />
      ) : title === "食事" ?(
        <MealCardContent meals={mealData} fetchData={()=>fetchData("meal")} />
      ): title === "排泄" ?(
        <ExcretionCardContent excretion={excretion} fetchData={()=>fetchData("excretion")} />
      ): title === "収用回数" ?(
        <ExpropriationCardContent expropriation={expropriation} fetchData={()=>fetchData("expropriation")} />
      ): title === "メモ" ?(
        <MemoCardContent memo={memo} fetchData={()=>fetchData("memo")} />
      ): title === "プール掃除" ?(
        <PoolCleaningCardContent poolCleaning={poolCleaning} fetchData={()=>fetchData("poolCleaning")} />
      ): title === "起床時間" ?(
        <WakeUpTimeCardContent wakeUpTime={wakeUpTime} fetchData={()=>fetchData("wakeUpTime")} />
      ): title === "飲水量" ?(
        <WaterCardContent water={water} fetchData={()=>fetchData("water")} />
      ) : title === "トレーニング" ?(
        <TrainingCardContent trainings={training} fetchData={()=>fetchData("training")} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default RecordCard;

type AddModalProps = {
  title: string;
  open: boolean;
  isEdit: boolean;
  handleClose: () => void;
  fetchData: () => void;
};

const AddModal = ({
  title,
  open,
  handleClose,
  isEdit,
  fetchData,
}: AddModalProps) => {
  if (title == "食事") {
    return (
      <MealModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  } else if (title == "気温") {
    return (
      <TemperatureModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  } else if (title == "エンリッチメント") {
    return (
      <EnrichmentModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  } else if (title == "イベント") {
    return (
      <EventModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  }else if (title == "プール掃除") {
    return (
      <PoolCleaningModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  }else if (title == "排泄") {
    return (
      <ExcretionModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  }else if (title == "収用回数") {
    return (
      <ExpropriationModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  }else if (title == "飲水量") {
    return (
      <WaterModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  }else if (title == "トレーニング") {
    return (
      <TrainingModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  }else if (title == "メモ") {
    return (
      <MemoModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  } else if (title == "起床時間") {
    return (
      <WakeUpTimeModal
        title={title}
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={fetchData}
      />
    );
  } else {
    return null;
  }
};
