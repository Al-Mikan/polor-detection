import { CreateMealProps, UpdateMealProps } from "@/components/type";
const BASE_URL = "http://0.0.0.0:8000/api";

// get
export const getMeals = async (date: string, polarId: number) => {
  const response = await fetch(`${BASE_URL}/meals/${polarId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  return response.json();
};

// create
export const createMeal = async (mealCreate: CreateMealProps) => {
  const response = await fetch(`${BASE_URL}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create meal");
  }
  return response.json();
};

// update
export const updateMeal = async (id: number, newTemp: UpdateMealProps) => {
  const response = await fetch(`${BASE_URL}/meals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update meal");
  }
  return response.json();
};

// delete
export const deleteMeal = async (id: number) => {
  const response = await fetch(`${BASE_URL}/meals/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete meal");
  }
};
