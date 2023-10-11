import { ReactElement } from "react";
import Aside from "@/components/Aside";
import { useState } from "react";
type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Aside />
      {children}
    </>
  );
};
export default Layout;
