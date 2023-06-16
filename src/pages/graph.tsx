import Calender from "@/components/Calender";
import type { NextPageWithLayout } from "next";
import Layout from "@/layout/Layout";
const Home: NextPageWithLayout = () => {
  return <div className="h-screen w-screen">Graoh</div>;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;
