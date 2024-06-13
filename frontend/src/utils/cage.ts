import { CreateCageProps, UpdateCageProps } from "../components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

//get
export const getCages = () => {
  return fetch(`${BASE_URL}/cages`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch cages");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const createCage = async (cageCreate: CreateCageProps) => {
  const response = await fetch(`${BASE_URL}/cages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cageCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create Cage");
  }
  return response.json();
};

export const updateCage = async (id: number, newCage: UpdateCageProps) => {
  const response = await fetch(`${BASE_URL}/cages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCage),
  });
  if (!response.ok) {
    throw new Error("Failed to update Cage");
  }
  return response.json();
};

export const deleteCage = async (id: number) => {
  const response = await fetch(`${BASE_URL}/cages/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete Cage");
  }
};
