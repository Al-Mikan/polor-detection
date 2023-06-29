export type polorProps = {
  id: number;
  name: string;
};
export type TimeDataProps = {
  id: number | null;
  startTime: Date;
  endTime: Date;
};
export type MealProps = {
  time: string;
  meal: string;
  value: number;
};

export type temperatureProps = {
  time: string;
  temperature: number;
};

export type enrichmentProps = {
  enrichment: string;
};

export type eventProps = {
  event: string;
};
