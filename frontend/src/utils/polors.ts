const BASE_URL = "http://localhost:8000";

//get
export const getPolors = () => {
  return fetch(`${BASE_URL}/polors`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch polors");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
