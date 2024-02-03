"use client";

import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 flex-warp gap-3 md:flex hidden ">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={(e) => handleTypeClick(item.value)}
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
