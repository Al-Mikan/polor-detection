const BASE_URL = "http://localhost:8000";
import { UpdateDeteciontTimeProps } from "@/components/type";
//get
export const getDetectionTimes = async (date: string) => {
  console.log(date);
  const response = await fetch(`${BASE_URL}/detectionTime?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch DetectionTimes");
  }
  return response.json();
};
// update
export const updateDetectionTime = async (
  id: number,
  newDetectionTime: UpdateDeteciontTimeProps
) => {
  const response = await fetch(`${BASE_URL}/detectionTime/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDetectionTime),
  });
  if (!response.ok) {
    throw new Error("Failed to update DetectionTimes");
  }
  return response.json();
};
