import type { NextPageWithLayout } from "next";
import BarChart from "@/components/BarChart";

const Graph: NextPageWithLayout = () => {
  return (
    <div className="pl-[220px] bg-backGround  min-h-screen">
      <BarChart />
    </div>
  );
};

export default Graph;
