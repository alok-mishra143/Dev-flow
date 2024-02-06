"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow  items-center gap-4 rounded-[10px] px-4 ${otherClass}`}
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
        value={search}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className="text-dark400_light700 paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
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
