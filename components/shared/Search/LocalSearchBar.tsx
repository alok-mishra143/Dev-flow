"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface CustomInputProps {
  route: string;
  placeholder: string;
  iconPostition: string;
  imgsrc: string;
  otherClass: string;
}

const LocalSearchBar = ({
  route,
  placeholder,
  iconPostition,
  imgsrc,
  otherClass,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient  flex min-h-[56px] grow items-center gap-1 rounded-[10px] px-4 ${otherClass}`}
    >
      {iconPostition == "left" && (
        <Image
          src={imgsrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value="" 
        onChange={()=>{}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none outline-none shadow-none bg-transparent"
      />
      {iconPostition == "right" && (
        <Image
          src={imgsrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
