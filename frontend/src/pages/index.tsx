import CalenderContent from "@/components/Calender";
import type { NextPageWithLayout } from "next";
const Calender: NextPageWithLayout = () => {
  return (
    <main className="pl-[220px] bg-backGround  min-h-screen ">
      <CalenderContent />
    </main>
  );
};

export default Calender;
