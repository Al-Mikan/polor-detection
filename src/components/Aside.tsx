import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { FaCalendarAlt, FaChartBar } from "react-icons/fa";

const Aside = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className=" bg-white w-[80px]  h-full fixed top-0 flex flex-col  text-grey items-center z-50">
      <div className="mt-[100px] flex flex-col gap-10">
        <div className="cursor-pointer   w-[32px] h-[32px] rounded-lg">
          <Link href="/">
            {pathname === "/" ? (
              <FaCalendarAlt className="w-full h-full text-primary p-1" />
            ) : (
              <FaCalendarAlt className="w-full h-full  text-[#969CAE] p-1" />
            )}
          </Link>
        </div>
        <div className="cursor-pointer w-[32px] h-[32px]  rounded-lg">
          <Link href="/graph">
            {pathname === "/graph" ? (
              <FaChartBar className="w-full h-full text-primary p-1" />
            ) : (
              <FaChartBar className="w-full h-full  text-[#969CAE] p-1" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Aside;
