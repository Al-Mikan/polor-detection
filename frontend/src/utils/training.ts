import { CreateTrainingProps, UpdateTrainingProps } from "@/components/type";
const BASE_URL = "http://0.0.0.0:8000/api";

// get
export const getTraining = async (date: string, polarId: number) => {
  const response = await fetch(`${BASE_URL}/training/${polarId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch training");
  }
  return response.json();
};

// create
export const createTraining = async (TrainingCreate: CreateTrainingProps) => {
  const response = await fetch(`${BASE_URL}/training`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TrainingCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create training");
  }
  return response.json();
};

// update
export const updateTraining = async (id: number, newTemp: UpdateTrainingProps) => {
  const response = await fetch(`${BASE_URL}/training/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update training");
  }
  return response.json();
};

// delete
export const deleteTraining = async (id: number) => {
  const response = await fetch(`${BASE_URL}/training/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete training");
  }
};
