import {
  CreatePolorCageLogProps,
  UpdatePolorCageLogProps,
} from "@/components/type";

const BASE_URL = "/api";

// get
export const getPolorCageLog = async (date: string) => {
  const response = await fetch(`${BASE_URL}/polorCageLog?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch polorCageLog");
  }
  return response.json();
};

// create
export const createPolorCageLog = async (
  polorCageLogCreate: CreatePolorCageLogProps
) => {
  const response = await fetch(`${BASE_URL}/polorCageLog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(polorCageLogCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create polorCageLog");
  }
  return response.json();
};

// update
export const updatePolorCageLog = async (
  id: number,
  newpolorCageLog: UpdatePolorCageLogProps
) => {
  const response = await fetch(`${BASE_URL}/polorCageLog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newpolorCageLog),
  });
  if (!response.ok) {
    throw new Error("Failed to update polorCageLog");
  }
  return response.json();
};
