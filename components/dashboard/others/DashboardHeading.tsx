import React from "react";

interface DashbaoardHeadingProps {
  title: string;
  subtitie?: string;
}

const DashboardHeading = ({ title, subtitie }: DashbaoardHeadingProps) => {
  return (
    <div>
      <h2 className="text-2xl lg:text-4xl  font-bold">{title}</h2>
      <p className="text-muted-foreground">{subtitie}</p>
    </div>
  );
};

export default DashboardHeading;
