const BASE_URL = "/api";

//get
export const getPolars = () => {
  return fetch(`${BASE_URL}/polars`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch polars");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
