export type RecordType =
  | "temperature"
  | "poolCleaning"
  | "expropriation"
  | "enrichment"
  | "event"
  | "meal"
  | "water"
  | "excretion"
  | "memo"
  | "training"
  | "wakeUpTime"
  | "detectTime"
  | "video"
  | "cage"
  | "animalCageLog";
//シロクマ

export type AnimalProps = {
  id: number;
  animalName: string;
  species: string;
};
export type CreateAnimalProps = {
  animalName: string;
  species: string;
};
export type UpdateAnimalProps = {
  animalName: string;
  species: string;
};

//ケージ
export type CageProps = {
  id: number;
  cageName: string;
};
export type CreateCageProps = {
  cageName: string;
};
export type UpdateCageProps = {
  cageName: string;
};

//シロクマケージ
export type AnimalCageLogProps = {
  id: number;
  animalId: number;
  cageId: number;
};
export type CreateAnimalCageLogProps = {
  animalId: number;
  cageId: number;
};
export type UpdateAnimalCageLogProps = {
  animalId: number;
  cageId: number;
  date: string;
};

//食事
export type MealProps = {
  id: number;
  time: string;
  meal: string;
  weight: number;
};

export type CreateMealProps = {
  animalId: number;
  date: string;
  time: string;
  meal: string;
  weight: number;
};

export type UpdateMealProps = {
  time: string;
  meal: string;
  weight: number;
};

//気温
export type TemperatureProps = {
  id: number;
  time: string;
  temperature: number;
};

export type CreateTemperatureProps = {
  animalId: number;
  date: string;
  time: string;
  temperature: number;
};

export type UpdateTemperatureProps = {
  time: string;
  temperature: number;
};

//エンリッチメント
export type EnrichmentProps = {
  id: number;
  enrichment: string;
};

export type CreateEnrichmentProps = {
  animalId: number;
  date: string;
  enrichment: string;
};

export type UpdateEnrichmentProps = {
  enrichment: string;
};

//イベント
export type EventProps = {
  id: number;
  event: string;
};

export type CreateEventProps = {
  animalId: number;
  date: string;
  event: string;
};

export type UpdateEventProps = {
  event: string;
};

//飲水
export type WaterProps = {
  id: number;
  value: number;
};
export type CreateWaterProps = {
  animalId: number;
  date: string;
  value: number;
};

export type UpdateWaterProps = {
  value: number;
};

//排泄
export type ExcretionProps = {
  id: number;
  number: number;
  status: string;
};
export type CreateExcretionProps = {
  animalId: number;
  date: string;
  number: number;
  status: string;
};
export type UpdateExcretionProps = {
  number: number;
  status: string;
};

//収用回数
export type ExpropriationProps = {
  id: number;
  expropriation: number;
};
export type CreateExpropriationProps = {
  animalId: number;
  date: string;
  expropriation: number;
};
export type UpdateExpropriationProps = {
  expropriation: number;
};

//メモ
export type MemoProps = {
  id: number;
  memo: string;
};
export type CreateMemoProps = {
  animalId: number;
  date: string;
  memo: string;
};
export type UpdateMemoProps = {
  memo: string;
};

//プール掃除
export type PoolCleaningProps = {
  id: number;
  poolCleaning: boolean;
};
export type CreatePoolCleaningProps = {
  animalId: number;
  date: string;
  poolCleaning: boolean;
};
export type UpdatePoolCleaningProps = {
  poolCleaning: boolean;
};

//トレーニング
export type TrainingProps = {
  id: number;
  training: string;
};
export type CreateTrainingProps = {
  animalId: number;
  date: string;
  training: string;
};
export type UpdateTrainingProps = {
  training: string;
};

//起床時間
export type WakeUpTimeProps = {
  id: number;
  time: string;
};
export type CreateWakeUpTimeProps = {
  animalId: number;
  date: string;
  time: string;
};
export type UpdateWakeUpTimeProps = {
  time: string;
};

//検知
export type DetectTimeProps = {
  id: number;
  startTime: string;
  endTime: string;
  cageId: number;
};

//ビデオ
export type VideoProps = {
  id: number;
  file: File;
};
export type CreateVideoProps = {
  animalId: number;
  file: File;
  cageId: number;
};
