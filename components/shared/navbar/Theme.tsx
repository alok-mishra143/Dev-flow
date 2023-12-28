"use client";

import React from "react";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

import { themes } from "@/constants";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state-open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="Light Mode"
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="Dark Mode"
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absoulate right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((items) => (
            <MenubarItem
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400  "
              key={items.value}
              onClick={() => {
                setMode(items.value);

                if (items.value !== "system") {
                  localStorage.theme = items.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={items.icon}
                alt={items.label}
                width={20}
                height={20}
                className={`${mode === items.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === items.value ? "text-primary-500" : "text-dark-100"
                } `}
              >
                {items.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
