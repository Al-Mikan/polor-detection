import { IconType } from 'react-icons/lib';
import { RecordType } from './../components/type';
import {
  FaThermometerHalf,
  FaLeaf,
  FaCalendarDay,
  FaPen,
  FaWater,
  FaClock,
  FaPoop,
  FaWarehouse,
  FaBroom,
  FaRunning,
} from "react-icons/fa";

type CardDataProps = {
    recordType: RecordType;
    icon: IconType;
    className: string;
};

type RecordTypeInfo = {
  recordType: RecordType;
  japanese: string;
};

export const recordTypeInfo: RecordTypeInfo[] = [
  { recordType: "temperature", japanese: "気温" },
  { recordType: "poolCleaning", japanese: "プールの清掃" },
  { recordType: "expropriation", japanese: "収用回数" },
  { recordType: "enrichment", japanese: "エンリッチメント" },
  { recordType: "event", japanese: "イベント" },
  { recordType: "meal", japanese: "食事" },
  { recordType: "water", japanese: "水" },
  { recordType: "excretion", japanese: "排泄" },
  { recordType: "memo", japanese: "メモ" },
  { recordType: "training", japanese: "トレーニング" },
  { recordType: "wakeUpTime", japanese: "起床時間" },
  { recordType: "detectTime", japanese: "検出時間" },
  { recordType: "video", japanese: "ビデオ" },
  { recordType: "cage", japanese: "ケージ" },
];

export const cardData:CardDataProps[] = [
  {
    recordType: "temperature",
    icon: FaThermometerHalf,
    className: "w-[300px] shadow-md"
  },
  {
    recordType: "poolCleaning",
    icon: FaBroom,
    className: "w-[300px] shadow-md h-[150px]"
  },
  {
    recordType: "expropriation",
    icon: FaWarehouse,
    className: "w-[300px] h-[150px] shadow-md"
  },
  {
    recordType: "enrichment",
    icon:FaLeaf,
    className: "w-[500px] shadow-md"
  },
  {
    recordType: "event",
    icon:FaCalendarDay,
    className: "w-[500px] shadow-md"
    },
    {
    recordType: "water",
    icon:FaWater,
    className: "w-[300px] shadow-md h-[150px]"
  },
  {
    recordType: "wakeUpTime",
    icon: FaClock,
    className: "w-[300px] shadow-md h-[150px]"
  },
  {
    recordType: "excretion",
    icon: FaPoop,
    className: "w-[300px] shadow-md h-[150px]"
  },
  {
    recordType: "training",
    icon: FaRunning,
    className: "w-[300px] shadow-md h-[150px]"
  },
  {
    recordType: "memo",
    icon: FaPen,
    className: "w-full shadow-md"
  }
];
