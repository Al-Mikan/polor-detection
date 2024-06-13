const BASE_URL = "http://0.0.0.0:8000/api";

import { CreateAnimalProps, UpdateAnimalProps } from "../components/type";
//get
export const getAnimals = () => {
  return fetch(`${BASE_URL}/animals`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch animals");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const createAnimal = async (animalCreate: CreateAnimalProps) => {
  const response = await fetch(`${BASE_URL}/animals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animalCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create Animal");
  }
  return response.json();
};

export const updateAnimal = async (
  id: number,
  newAnimal: UpdateAnimalProps
) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnimal),
  });
  if (!response.ok) {
    throw new Error("Failed to update Animal");
  }
  return response.json();
};

export const deleteAnimal = async (id: number) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete Animal");
  }
};
