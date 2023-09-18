const BASE_URL = "/api";

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
