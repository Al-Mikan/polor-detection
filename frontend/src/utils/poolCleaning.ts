import { CreatePoolCleaningProps, UpdatePoolCleaningProps } from "@/components/type";
const BASE_URL = "/api";

// get
export const getPoolCleaning = async (date: string, polorId: number) => {
  const response = await fetch(`${BASE_URL}/poolCleaning/${polorId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch poolCleaning");
  }
  return response.json();
};

// create
export const createPoolCleaning = async (PoolCleaningCreate: CreatePoolCleaningProps) => {
  const response = await fetch(`${BASE_URL}/poolCleaning`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(PoolCleaningCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create poolCleaning");
  }
  return response.json();
};

// update
export const updatePoolCleaning = async (id: number, newTemp: UpdatePoolCleaningProps) => {
  const response = await fetch(`${BASE_URL}/poolCleaning/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update poolCleaning");
  }
  return response.json();
};

// delete
export const deletePoolCleaning = async (id: number) => {
  const response = await fetch(`${BASE_URL}/poolCleaning/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete poolCleaning");
  }
};
