import {
  CreateAnimalCageLogProps,
  UpdateAnimalCageLogProps,
} from "@/components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

// get
export const getAnimalCageLog = async (date: string) => {
  const response = await fetch(`${BASE_URL}/animalCageLog?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch animalCageLog");
  }
  return response.json();
};

// create
export const createAnimalCageLog = async (
  animalCageLogCreate: CreateAnimalCageLogProps
) => {
  const response = await fetch(`${BASE_URL}/animalCageLog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animalCageLogCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create animalCageLog");
  }
  return response.json();
};

// update
export const updateAnimalCageLog = async (
  id: number,
  newanimalCageLog: UpdateAnimalCageLogProps
) => {
  const response = await fetch(`${BASE_URL}/animalCageLog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newanimalCageLog),
  });
  if (!response.ok) {
    throw new Error("Failed to update animalCageLog");
  }
  return response.json();
};

// delete
export const deleteAnimalCageLog = async (id: number) => {
  const response = await fetch(`${BASE_URL}/animalCageLog/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete animalCageLog");
  }
  return response.json();
};
