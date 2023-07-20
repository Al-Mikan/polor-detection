import React, { ReactNode } from "react";
import MealModal from "./Modals/MealModal";
import TemperatureModal from "./Modals/TemperatureModal";
import EnrichmentModal from "./Modals/EnrichmentModal";
import EventModal from "./Modals/EventModal";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  MealProps,
  TemperatureProps,
  EnrichmentProps,
  EventProps,
} from "./type";
import { getTemperatures } from "@/utils/temperature";
import { getMeals } from "@/utils/meal";
import { getEnrichments } from "@/utils/enrichment";
import { getEvents } from "@/utils/event";
import { useEffect, useContext } from "react";
import { AppContext } from "@/pages/_app";
import TemperatureCardContent from "./CardContent/TemperatureCardContent";
import MealCardContent from "./CardContent/MealCardContent";
import EnrichmentCardContent from "./CardContent/EnrichmentCardContent";
import EventCardContent from "./CardContent/EventCardContent";

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

  const fetchData = async () => {
    try {
      setTemperatureData(await getTemperatures(date.format("YYYY-MM-DD"), id));
      setMealData(await getMeals(date.format("YYYY-MM-DD"), id));
      setEnrichmentData(await getEnrichments(date.format("YYYY-MM-DD"), id));
      setEventData(await getEvents(date.format("YYYY-MM-DD"), id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, id]);

  return (
    <div className={`bg-white px-8 py-8 rounded-lg h-fit ${className}`}>
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
          className="px-4 font-bold text-lg"
          style={{ backgroundColor: "#2B7BF4" }}
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
        fetchData={fetchData}
      />
      {title === "気温" ? (
        <TemperatureCardContent
          temperature={temperatureData}
          fetchData={fetchData}
        />
      ) : title === "イベント" ? (
        <EventCardContent events={eventData} fetchData={fetchData} />
      ) : title === "エンリッチメント" ? (
        <EnrichmentCardContent
          enrichments={enrichmentData}
          fetchData={fetchData}
        />
      ) : (
        <MealCardContent meals={mealData} fetchData={fetchData} />
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
  } else {
    return null;
  }
};
