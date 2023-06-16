import { ReactElement } from "react";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { useState } from "react";
type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Aside />
      <Header />
      {children}
    </>
  );
};
export default Layout;
