import CalenderContent from "@/components/Calender";
import type { NextPageWithLayout } from "next";

const Calender: NextPageWithLayout = () => {
  return (
    <div className="h-screen  ml-[80px] bg-[#F8F9FF]">
      <CalenderContent />
    </div>
  );
};

export default Calender;
