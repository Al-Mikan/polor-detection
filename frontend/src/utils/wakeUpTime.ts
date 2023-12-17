import { CreateWakeUpTimeProps, UpdateWakeUpTimeProps } from "@/components/type";
const BASE_URL = "/api";

// get
export const getWakeUpTime = async (date: string, polorId: number) => {
  const response = await fetch(`${BASE_URL}/wakeupTime/${polorId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch wakeUpTime");
  }
  return response.json();
};

// create
export const createWakeUpTime = async (WakeUpTimeCreate: CreateWakeUpTimeProps) => {
  const response = await fetch(`${BASE_URL}/wakeupTime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(WakeUpTimeCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create wakeUpTime");
  }
  return response.json();
};

// update
export const updateWakeUpTime = async (id: number, newTemp: UpdateWakeUpTimeProps) => {
  const response = await fetch(`${BASE_URL}/wakeupTime/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update wakeUpTime");
  }
  return response.json();
};

// delete
export const deleteWakeUpTime = async (id: number) => {
  const response = await fetch(`${BASE_URL}/wakeupTime/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete wakeUpTime");
  }
};
