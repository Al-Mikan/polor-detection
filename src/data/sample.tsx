import { polorProps, TimeDataProps } from "@/components/type";

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
export const mealRows = [
  { time: "09:00", meal: "魚", value: 500 },
  { time: "12:00", meal: "にんじん", value: 1000 },
  { time: "15:00", meal: "肉", value: 800 },
  { time: "18:00", meal: "sample", value: 200 },
];

export const temperatureRows = [
  { time: "09:00", temperature: 12 },
  { time: "12:00", temperature: 6.5 },
  { time: "15:00", temperature: 10 },
  { time: "18:00", temperature: 20 },
];

export const enrichments = [{ enrichment: "ボール" }, { enrichment: "sample" }];
export const events = [{ event: "" }];
