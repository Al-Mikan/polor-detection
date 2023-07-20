import {
  polorProps,
  TimeDataProps,
  MealProps,
  TemperatureProps,
  EnrichmentProps,
  EventProps,
} from "@/components/type";

export const polors: polorProps[] = [
  {
    id: 1,
    name: "ほくと",
  },
  {
    id: 2,
    name: "らら",
  },
];

export const timeData: TimeDataProps[] = [
  {
    id: 1,
    startTime: new Date("2023-06-21T09:00:00"),
    endTime: new Date("2023-06-21T12:00:00"),
  },
  {
    id: 1,
    startTime: new Date("2023-06-21T13:00:00"),
    endTime: new Date("2023-06-21T13:21:00"),
  },
  {
    id: 1,
    startTime: new Date("2023-06-21T15:00:10"),
    endTime: new Date("2023-06-21T17:10:00"),
  },
  {
    id: 1,
    startTime: new Date("2023-06-22T09:00:00"),
    endTime: new Date("2023-06-22T09:20:10"),
  },
  {
    id: 1,
    startTime: new Date("2023-06-22T10:05:00"),
    endTime: new Date("2023-06-22T12:20:10"),
  },
  {
    id: 1,
    startTime: new Date("2023-06-22T13:32:01"),
    endTime: new Date("2023-06-22T14:10:00"),
  },
  {
    id: 1,
    startTime: new Date("2023-06-22T17:10:00"),
    endTime: new Date("2023-06-22T18:20:50"),
  },

  {
    id: 2,
    startTime: new Date("2023-06-21T06:10:40"),
    endTime: new Date("2023-06-21T06:15:00"),
  },
  {
    id: 2,
    startTime: new Date("2023-06-21T09:42:00"),
    endTime: new Date("2023-06-21T11:20:00"),
  },
  {
    id: 2,
    startTime: new Date("2023-06-01T09:00:00"),
    endTime: new Date("2023-06-01T12:00:00"),
  },
  {
    id: 2,
    startTime: new Date("2023-06-01T09:00:00"),
    endTime: new Date("2023-06-01T12:00:00"),
  },
  {
    id: 2,
    startTime: new Date("2023-06-01T15:00:10"),
    endTime: new Date("2023-06-01T17:10:00"),
  },
];
export const mealRows: MealProps[] = [
  { id: 1, time: "09:00", meal: "魚", weight: 500 },
  { id: 2, time: "12:00", meal: "にんじん", weight: 1000 },
  { id: 3, time: "15:00", meal: "肉", weight: 800 },
  { id: 4, time: "18:00", meal: "sample", weight: 200 },
];

export const temperatureRows: TemperatureProps[] = [
  { id: 1, time: "09:00", temperature: 12 },
  { id: 2, time: "12:00", temperature: 6.5 },
  { id: 3, time: "15:00", temperature: 10 },
  { id: 4, time: "18:00", temperature: 20 },
];

export const enrichments: EnrichmentProps[] = [
  {
    id: 1,
    startTime: "09:00",
    endTime: "13:00",
    enrichment: "ボール",
  },
  {
    id: 2,
    startTime: "09:00",
    endTime: "13:00",
    enrichment: "samplesamplesamplesample",
  },
];
export const events: EnrichmentProps[] = [
  {
    id: 1,
    startTime: "13:00",
    endTime: "14:00",
    enrichment: "イベント",
  },
];
