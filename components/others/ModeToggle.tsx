"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme,theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState(theme);
  const [isMounted, setIsMounted] = React.useState(false);


  React.useEffect(() => {
    setIsMounted(true)
  },[]);

  if(!isMounted){
    return null
  }

  if (selectedTheme === "light") {
    return (
      <Button
        onClick={() => {
          setSelectedTheme("dark");
          setTheme("dark");
        }}
        variant="ghost"
        size="icon"
        className="hover:bg-slate-100 hover:dark:bg-slate-800 rounded-full"
      >
        <Sun className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </Button>
    );

  } else if(selectedTheme === 'dark') {
    
    return (
      <Button
        onClick={() => {
          setSelectedTheme("light");
          setTheme("light");
        }}
        variant="ghost"
        size="icon"
        className="hover:bg-slate-100 hover:dark:bg-slate-800 rounded-full"
      >
         <Moon className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    );
  }
}
