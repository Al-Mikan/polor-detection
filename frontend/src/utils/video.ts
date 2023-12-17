import { CreateVideoProps } from "@/components/type";
const BASE_URL = "/api";

// get
export const getVideo = async (date: string, polarId: number) => {
  const response = await fetch(`${BASE_URL}/video/${polarId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch video");
  }
  return response.json();
};

// create
export const createVideo = async (videoCreate: CreateVideoProps) => {
  const response = await fetch(`${BASE_URL}/video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create video");
  }
  return response.json();
};

// delete
export const deleteVideo = async (id: number) => {
  const response = await fetch(`${BASE_URL}/video/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete video");
  }
};
