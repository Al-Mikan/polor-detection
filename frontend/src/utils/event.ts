import { CreateEventProps, UpdateEventProps } from "@/components/type";

const BASE_URL = "http://localhost:8000";

// get
export const getEvents = async (date: string, polorId: number) => {
  const response = await fetch(`${BASE_URL}/events/${polorId}?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

// create
export const createEvent = async (eventCreate: CreateEventProps) => {
  const response = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create event");
  }
  return response.json();
};

// update
export const updateEvent = async (id: number, newTemp: UpdateEventProps) => {
  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTemp),
  });
  if (!response.ok) {
    throw new Error("Failed to update event");
  }
  return response.json();
};

// delete
export const deleteEvent = async (id: number) => {
  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete event");
  }
};
