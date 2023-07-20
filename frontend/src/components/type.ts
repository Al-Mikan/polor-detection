export type polorProps = {
  id: number;
  name: string;
};
export type TimeDataProps = {
  id: number;
  startTime: Date;
  endTime: Date;
};
export type MealProps = {
  id: number;
  time: string;
  meal: string;
  weight: number;
};

export type EnrichmentProps = {
  id: number;
  startTime: string;
  endTime: string;
  enrichment: string;
};

export type EventProps = {
  id: number;
  startTime: string;
  endTime: string;
  event: string;
};

export type TemperatureProps = {
  id: number;
  time: string;
  temperature: number;
};

export type CreateTemperatureProps = {
  polorId: number;
  date: string;
  time: string;
  temperature: number;
};

export type UpdateTemperatureProps = {
  time: string;
  temperature: number;
};
