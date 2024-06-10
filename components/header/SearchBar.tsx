import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/shop?search=${value}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative border dark:border-gray-500 rounded-full lg:py-1.5 pl-10 lg:pr-4 w-[30rem] flex items-center shadow-md 
                 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200"
    >
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <Search className="h-5 w-5 text-gray-500" />
      </div>

      {/* Search Input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for products..."
        className="w-full bg-transparent pl-5 border-none focus:ring-0 outline-none"
      />

      {/* Search Button (optional) */}
      <Button
        type="submit"
        size={"lg"}
        className="ml-2 rounded-full flex items-center gap-2 whitespace-nowrap"
      >
        <Search className="w-5 h-5 hidden md:block" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
