import {
  CreateExcretionProps,
  UpdateExcretionProps,
} from "@/components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

// get excretion
export const getExcretion = async (date: string, polarId: number) => {
  const response = await fetch(
    `${BASE_URL}/excretion/${polarId}?date=${date}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch excretion");
  }
  return response.json();
};

// create excretion
export const createExcretion = async (tempCreate: CreateExcretionProps) => {
  const response = await fetch(`${BASE_URL}/excretion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create excretion");
  }
  return response.json();
};

// update excretion
export const updateExcretion = async (
  id: number,
  newTemp: UpdateExcretionProps
) => {
  const response = await fetch(`${BASE_URL}/excretion/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update excretion");
  }
  return response.json();
};

// delete excretion
export const deleteExcretion = async (id: number) => {
  const response = await fetch(`${BASE_URL}/excretion/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete excretion");
  }
};
