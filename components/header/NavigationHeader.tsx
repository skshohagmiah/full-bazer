
import {  Phone } from "lucide-react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import Navlinks from "./Navlinks";
import CategoriesDropdown from "../categories/CategoriesDropdown";

const NavigationHeader = () => {

  return (
    <header className="bg-indigo-600 dark:bg-slate-600 text-white shadow-md hidden lg:block">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center">
          {/* Category Hover */}
          <CategoriesDropdown />
          {/* Navigation Links */}
          <Navlinks />
          <div className="flex items-center gap-2">
            <Phone className="animate-bounce mt-2" /> +0129430325
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default NavigationHeader;
