import type { NextPageWithLayout } from "next";
import Setting from "@/components/Setting";

const SettingPage: NextPageWithLayout = () => {
  return (
    <main className="pl-[220px] bg-backGround  min-h-screen ">
      <Setting />
    </main>
  );
};

export default SettingPage;
