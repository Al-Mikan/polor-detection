import {
  CreateTemperatureProps,
  UpdateTemperatureProps,
} from "@/components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

// get temperature
export const getTemperatures = async (date: string, polarId: number) => {
  const response = await fetch(
    `${BASE_URL}/temperatures/${polarId}?date=${date}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch temperatures");
  }
  return response.json();
};

// create temperature
export const createTemperature = async (tempCreate: CreateTemperatureProps) => {
  const response = await fetch(`${BASE_URL}/temperatures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create temperature");
  }
  return response.json();
};

// update temperature
export const updateTemperature = async (
  id: number,
  newTemp: UpdateTemperatureProps
) => {
  const response = await fetch(`${BASE_URL}/temperatures/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update temperature");
  }
  return response.json();
};

// delete temperature
export const deleteTemperature = async (id: number) => {
  const response = await fetch(`${BASE_URL}/temperatures/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete temperature");
  }
};
