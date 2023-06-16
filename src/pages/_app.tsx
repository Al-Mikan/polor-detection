import "@/styles/globals.css";
import type { AppPropsWithLayout } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Layout from "@/layout/Layout";

import React, { Dispatch, useState } from "react";

export const AppContext = React.createContext(
  {} as {
    id: number;
    setId: Dispatch<React.SetStateAction<number>>;
  }
);

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [id, setId] = useState(1);
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <AppContext.Provider value={{ id, setId }}>
      <Layout>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </Layout>
    </AppContext.Provider>
  );
};
export default App;
