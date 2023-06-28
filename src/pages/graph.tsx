import type { NextPageWithLayout } from "next";
import Layout from "@/layout/Layout";
import BarChart from "@/components/BarChart";

const Graph: NextPageWithLayout = () => {
  return (
    <div className="pl-[80px] bg-backGround  pt-[75px] min-h-screen">
      <BarChart />
    </div>
  );
};

export default Graph;
