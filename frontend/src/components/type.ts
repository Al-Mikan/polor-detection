//シロクマ
export type PolarProps = {
  id: number;
  polarName: string;
};

//ケージ
export type CageProps = {
  id: number;
  cageName: string;
};

//シロクマケージ
export type PolarCageLogProps = {
  id: number;
  polarId: number;
  cageId: number;
};
export type CreatePolarCageLogProps = {
  id: number;
  polarId: number;
  cageId: number;
};
export type UpdatePolarCageLogProps = {
  polarId: number;
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
  polarId: number;
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
  polarId: number;
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
  polarId: number;
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
  polarId: number;
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
}
export type CreateWaterProps = {
  polarId: number;
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
}
export type CreateExcretionProps = {
  polarId: number;
  date: string;
  number: number;
  status: string;
}
export type UpdateExcretionProps = {
  number: number;
  status: string;
}

//収用回数
export type ExpropriationProps = {
  id: number;
  expropriation: number;
}
export type CreateExpropriationProps = {
  polarId: number;
  date: string;
  expropriation: number;
}
export type UpdateExpropriationProps = {
  expropriation: number;
}

//メモ
export type MemoProps = {
  id: number;
  memo: string;
}
export type CreateMemoProps = {
  polarId: number;
  date: string;
  memo: string;
}
export type UpdateMemoProps = {
  memo: string;
}

//プール掃除
export type PoolCleaningProps = {
  id: number;
  poolCleaning: boolean;
}
export type CreatePoolCleaningProps = {
  polarId: number;
  date: string;
  poolCleaning: boolean;
}
export type UpdatePoolCleaningProps = {
  poolCleaning: boolean;
}

//トレーニング
export type TrainingProps = {
  id: number;
  training: string;
}
export type CreateTrainingProps = {
  polarId: number;
  date: string;
  training: string;
}
export type UpdateTrainingProps = {
  training: string;
}

//起床時間
export type WakeUpTimeProps = {
  id: number;
  time: string;
}
export type CreateWakeUpTimeProps = {
  polarId: number;
  date: string;
  time: string;
}
export type UpdateWakeUpTimeProps = {
  time: string;
}

//検知
export type DetectTimeProps = {
  id: number;
  startTime: string;
  endTime: string;
  cageId: number;
}

//ビデオ
export type VideoProps = {
  id: number;
  file: File;
}
export type CreateVideoProps = {
  polarId: number;
  file: File;
  cageId: number;
}
