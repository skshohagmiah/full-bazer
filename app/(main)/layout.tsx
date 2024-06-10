import Footer from "@/components/footer/Footer";
import NavigationHeader from "@/components/header/NavigationHeader";
import Topheader from "@/components/header/Topheader";
import TopHeaderInfoBar from "@/components/header/TopHeaderInfoBar";
import ScrollToTopButton from "@/components/others/ScrollToTop";
import ModalProvider from "@/components/providers/ModalProvider";
import { getCurrentUser } from "@/lib/getCurrentUser";
import React from "react";

const Mainlayout = async({ children }: { children: React.ReactNode }) => {

  const currentUser = await getCurrentUser()

  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      {/* <TopHeaderInfoBar /> */}
      <Topheader currentUser={currentUser}/>
      <NavigationHeader />
      {children}
      <Footer />
      <ScrollToTopButton />
      <ModalProvider />
    </div>
  );
};

export default Mainlayout;
