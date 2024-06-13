import "@/styles/globals.css";
import type { AppPropsWithLayout } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Layout from "@/layout/Layout";

import React, { Dispatch, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AnimalProps } from "@/components/type";

export const AppContext = React.createContext(
  {} as {
    animalId: number;
    setAnimalId: Dispatch<React.SetStateAction<number>>;
    date: dayjs.Dayjs;
    setDate: Dispatch<React.SetStateAction<Dayjs>>;
    animals: AnimalProps[];
    setAnimals: Dispatch<React.SetStateAction<AnimalProps[]>>;
  }
);

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [animalId, setAnimalId] = useState(1);
  const [date, setDate] = useState(dayjs());
  const [animals, setAnimals] = useState([] as AnimalProps[]);
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <AppContext.Provider
      value={{ animalId, setAnimalId, date, setDate, animals, setAnimals }}
    >
      <Layout>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </Layout>
    </AppContext.Provider>
  );
};
export default App;
