const BASE_URL = "http://0.0.0.0:8000/api";
import { DetectTimeProps } from "@/components/type";
//get
export const getDetectionTimes = async (date: string) => {
  console.log(date);
  const response = await fetch(`${BASE_URL}/detectionTime?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch DetectionTimes");
  }
  return response.json();
};
