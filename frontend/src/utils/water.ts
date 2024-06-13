import {
  CreateWaterProps,
  UpdateWaterProps,
} from "@/components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

// get water
export const getWater = async (date: string, polarId: number) => {
  const response = await fetch(
    `${BASE_URL}/water/${polarId}?date=${date}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch water");
  }
  return response.json();
};

// create water
export const createWater = async (tempCreate: CreateWaterProps) => {
  const response = await fetch(`${BASE_URL}/water`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create water");
  }
  return response.json();
};

// update water
export const updateWater = async (
  id: number,
  newTemp: UpdateWaterProps
) => {
  const response = await fetch(`${BASE_URL}/water/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update water");
  }
  return response.json();
};

// delete water
export const deleteWater = async (id: number) => {
  const response = await fetch(`${BASE_URL}/water/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete water");
  }
};
