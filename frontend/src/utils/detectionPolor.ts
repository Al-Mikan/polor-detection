const BASE_URL = "/api";
import { CreateDetectionPolorProps } from "@/components/type";
//get
export const getDetectionPolors = async (date: string) => {
  const response = await fetch(`${BASE_URL}/detectionPolor?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch DetectionPolors");
  }
  return response.json();
};
// update
export const updateDetectionPolors = async (
  id: number,
  newDetectionPolor: CreateDetectionPolorProps
) => {
  const response = await fetch(`${BASE_URL}/detectionPolor/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDetectionPolor),
  });
  if (!response.ok) {
    throw new Error("Failed to update detectionPolor");
  }
  return response.json();
};

// create
export const createDetectionPolors = async (
  detectionPolorCreate: CreateDetectionPolorProps
) => {
  const response = await fetch(`${BASE_URL}/detectionPolor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(detectionPolorCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create detectionPolor");
  }
  return response.json();
};
