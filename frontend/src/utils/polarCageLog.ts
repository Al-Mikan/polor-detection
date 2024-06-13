import {
  CreatePolarCageLogProps,
  UpdatePolarCageLogProps,
} from "@/components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

// get
export const getPolarCageLog = async (date: string) => {
  const response = await fetch(`${BASE_URL}/polarCageLog?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch polarCageLog");
  }
  return response.json();
};

// create
export const createPolarCageLog = async (
  polarCageLogCreate: CreatePolarCageLogProps
) => {
  const response = await fetch(`${BASE_URL}/polarCageLog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(polarCageLogCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create polarCageLog");
  }
  return response.json();
};

// update
export const updatePolarCageLog = async (
  id: number,
  newpolarCageLog: UpdatePolarCageLogProps
) => {
  const response = await fetch(`${BASE_URL}/polarCageLog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newpolarCageLog),
  });
  if (!response.ok) {
    throw new Error("Failed to update polarCageLog");
  }
  return response.json();
};
