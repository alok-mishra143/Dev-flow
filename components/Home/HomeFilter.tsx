"use client";

import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilter = () => {
  const active = "recommended";
  return (
    <div className="mt-10 flex-warp gap-3 md:flex hidden ">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={`body-medium rounded-lg  px-6 py-4 capitalize shadow-none

        ${
          active == item.value
            ? "text-primary-500 bg-primary-100 "
            : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
        }


        `}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
