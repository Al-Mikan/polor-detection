import {
  CreateExpropriationProps,
  UpdateExpropriationProps,
} from "@/components/type";

const BASE_URL = "/api";

// get expropriation
export const getExpropriation = async (date: string, polarId: number) => {
  const response = await fetch(
    `${BASE_URL}/expropriation/${polarId}?date=${date}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch expropriation");
  }
  return response.json();
};

// create expropriation
export const createExpropriation = async (tempCreate: CreateExpropriationProps) => {
  const response = await fetch(`${BASE_URL}/expropriation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create expropriation");
  }
  return response.json();
};

// update expropriation
export const updateExpropriation = async (
  id: number,
  newTemp: UpdateExpropriationProps
) => {
  const response = await fetch(`${BASE_URL}/expropriation/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update expropriation");
  }
  return response.json();
};

// delete expropriation
export const deleteExpropriation = async (id: number) => {
  const response = await fetch(`${BASE_URL}/expropriation/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete expropriation");
  }
};
