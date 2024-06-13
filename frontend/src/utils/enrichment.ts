import {
  CreateEnrichmentProps,
  UpdateEnrichmentProps,
} from "@/components/type";

const BASE_URL = "http://0.0.0.0:8000/api";

// get
export const getEnrichments = async (date: string, polarId: number) => {
  const response = await fetch(
    `${BASE_URL}/enrichments/${polarId}?date=${date}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Enrichment");
  }
  return response.json();
};

// create
export const createEnrichment = async (
  enrichmentCreate: CreateEnrichmentProps
) => {
  const response = await fetch(`${BASE_URL}/enrichments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrichmentCreate),
  });
  if (!response.ok) {
    throw new Error("Failed to create Enrichment");
  }
  return response.json();
};

// update
export const updateEnrichment = async (
  id: number,
  newEnrichment: UpdateEnrichmentProps
) => {
  const response = await fetch(`${BASE_URL}/enrichments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEnrichment),
  });
  if (!response.ok) {
    throw new Error("Failed to update Enrichment");
  }
  return response.json();
};

// delete
export const deleteEnrichment = async (id: number) => {
  const response = await fetch(`${BASE_URL}/enrichments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete Enrichment");
  }
};
