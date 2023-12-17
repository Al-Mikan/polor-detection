import { CreateMemoProps, UpdateMemoProps } from "@/components/type";
const BASE_URL = "/api";

// get
export const getMemo = async (date: string, polarId: number) => {
  const response = await fetch(`${BASE_URL}/memo/${polarId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch memo");
  }
  return response.json();
};

// create
export const createMemo = async (MemoCreate: CreateMemoProps) => {
  const response = await fetch(`${BASE_URL}/memo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(MemoCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create memo");
  }
  return response.json();
};

// update
export const updateMemo = async (id: number, newTemp: UpdateMemoProps) => {
  const response = await fetch(`${BASE_URL}/memo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update memo");
  }
  return response.json();
};

// delete
export const deleteMemo = async (id: number) => {
  const response = await fetch(`${BASE_URL}/memo/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete memo");
  }
};
