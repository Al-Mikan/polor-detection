import React, { ReactElement, ReactNode } from "react";
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
import { Button, Icon } from "@mui/material";
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

import { RecordType } from "./type";
import { IconType } from "react-icons";
import { recordTypeInfo } from "@/data/cardData";

type RecordCardProps = {
  recordType: RecordType;
  icon: IconType;
  className?: string;
};


const RecordCard = ({ recordType,icon, className }: RecordCardProps) => {
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


  const fetchData = async (dataType:string): Promise<void> => {
    try {
      let data;
      switch (dataType) {
        case 'temperature':
          data = await getTemperatures(date.format("YYYY-MM-DD"), id);
          setTemperatureData(data);
          console.log("create temperature data", data);
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

  const japaneseTranslation = recordTypeInfo.find(info => info.recordType === recordType);
  return (
    <div className={`bg-white px-6 py-6 rounded-3xl   ${className}`}>
      <div className="flex justify-between mb-2">
        <p className="text-xl  text-gray-700 font-bold  flex items-center gap-2">
          <Icon component={icon} />
          {japaneseTranslation?.japanese}
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
        recordType={recordType}
        open={addmodalOpen}
        handleClose={() => {
          setAddmodalOpen(false);
        }}
        isEdit={false}
        fetchData={()=>fetchData(recordType)}
      />
      {recordType === "temperature" ? (
        <TemperatureCardContent
          temperature={temperatureData}
          fetchData={()=>fetchData("temperature")}
        />
      ) : recordType === "event" ? (
        <EventCardContent events={eventData} fetchData={()=>fetchData("event")} />
      ) : recordType === "enrichment" ? (
        <EnrichmentCardContent
          enrichments={enrichmentData}
          fetchData={()=>fetchData("enrichment")}
        />
      ) : recordType === "meal" ?(
        <MealCardContent meals={mealData} fetchData={()=>fetchData("meal")} />
      ): recordType === "excretion" ?(
        <ExcretionCardContent excretion={excretion} fetchData={()=>fetchData("excretion")} />
      ): recordType === "expropriation" ?(
        <ExpropriationCardContent expropriation={expropriation} fetchData={()=>fetchData("expropriation")} />
      ): recordType === "memo" ?(
        <MemoCardContent memo={memo} fetchData={()=>fetchData("memo")} />
      ): recordType === "poolCleaning" ?(
        <PoolCleaningCardContent poolCleaning={poolCleaning} fetchData={()=>fetchData("poolCleaning")} />
      ): recordType === "wakeUpTime" ?(
        <WakeUpTimeCardContent wakeUpTime={wakeUpTime} fetchData={()=>fetchData("wakeUpTime")} />
      ): recordType === "water" ?(
        <WaterCardContent water={water} fetchData={()=>fetchData("water")} />
      ) : recordType === "training" ?(
        <TrainingCardContent trainings={training} fetchData={()=>fetchData("training")} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default RecordCard;

type AddModalProps = {
  recordType: RecordType;
  open: boolean;
  isEdit: boolean;
  handleClose: () => void;
  fetchData: (dataType:string) => void;
};

const AddModal = ({
  recordType,
  open,
  handleClose,
  isEdit,
  fetchData,
}: AddModalProps) => {
  if (recordType == "meal") {
    return (
      <MealModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  } else if (recordType == "temperature") {
    return (
      <TemperatureModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("tem1")}
      />
    );
  } else if (recordType == "enrichment") {
    return (
      <EnrichmentModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  } else if (recordType == "event") {
    return (
      <EventModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  }else if (recordType == "poolCleaning") {
    return (
      <PoolCleaningModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  }else if (recordType == "excretion") {
    return (
      <ExcretionModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  }else if (recordType == "expropriation") {
    return (
      <ExpropriationModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  }else if (recordType == "water") {
    return (
      <WaterModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  }else if (recordType == "training") {
    return (
      <TrainingModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  }else if (recordType == "memo") {
    return (
      <MemoModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  } else if (recordType == "wakeUpTime") {
    return (
      <WakeUpTimeModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        fetchData={()=>fetchData("meal")}
      />
    );
  } else {
    return null;
  }
};
