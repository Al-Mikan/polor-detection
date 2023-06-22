import CalenderContent from "@/components/Calender";
import type { NextPageWithLayout } from "next";

const Calender: NextPageWithLayout = () => {
  return (
    <div className="pl-[80px] bg-backGround  pt-[75px] min-h-screen ">
      <CalenderContent />
    </div>
  );
};

export default Calender;
