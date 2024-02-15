import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import NavBar from "@/components/shared/navbar/NavBar";
import { Toaster } from "@/components/ui/toaster";
import React, { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Loading = () => {
  return (
    <main className="background-light850_dark100 relative ">
      {/* Navbar */}
      <nav
        className="flex-between 
    dark:bg-dark-200/80 light:bg-light-900/80 backdrop-blur-md
     fixed x-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 z-50 "
      >
        <Link href="/" className="flex items-center gap-1">
          <Skeleton className="h-10 w-28 " /> {/* Logo Placeholder */}
          <Skeleton className="h2-bold font-spaceGrotesk max-sm:hidden" />
        </Link>

        <Skeleton className="h-10 w-96 " />

        {/* Theme, User Button, and Mobile Nav */}
        <div className="flex-between gap-5">
          <Skeleton className="h-10 w-10 rounded-full" />{" "}
          <Skeleton className="h-10 w-10 rounded-full" />{" "}
          {/* User Avatar Placeholder */}
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar */}
        <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
          <div className="flex flex-1 flex-col gap-6">
            {/* Placeholder for Sidebar Links */}
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-lg mb-2" />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Skeleton className="h-12 w-full rounded-lg mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </section>

        {/* Main Content Area */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 ">
          <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
            <Skeleton className="h-14 flex-1" />
            <div className="hidden max-md:block">
              <Skeleton className="h-14 w-28" />
            </div>
          </div>

          <div className="my-10 hidden flex-wrap gap-3 md:flex">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>

          <div className="flex flex-col gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
          <div>
            <h3 className="h3-bold text-dark200_light900">Top question</h3>

            <div className="mt-5 flex w-full flex-col gap-[10px]">
              {/* Placeholder for Hot Questions */}
              {[...Array(4)].map((question) => (
                <Skeleton className="h-9 w-full " />
              ))}
            </div>
          </div>

          <div className="mt-7 flex w-full flex-col gap-[30px]">
            <h3 className="h3-bold text-dark200_light900">Top Tags</h3>

            <div className="mt-7 flex flex-col gap-4">
              {/* Placeholder for Popular Tags */}
              {[...Array(3)].map((tag) => (
                <Skeleton className="h-12 w-28 mb-2" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Loading;
