import Footer from "@/components/footer/Footer";
import NavigationHeader from "@/components/header/NavigationHeader";
import Topheader from "@/components/header/Topheader";
import TopHeaderInfoBar from "@/components/header/TopHeaderInfoBar";
import ScrollToTopButton from "@/components/others/ScrollToTop";
import React from "react";

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      {/* <TopHeaderInfoBar /> */}
      <Topheader />
      <NavigationHeader />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Mainlayout;
