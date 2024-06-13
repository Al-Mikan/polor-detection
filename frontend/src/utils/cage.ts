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
