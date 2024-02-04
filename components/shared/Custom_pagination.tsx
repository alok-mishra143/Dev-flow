"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Custom_pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null; // hide pagination if there is only one page
  return (
    <div>
      <Pagination className="text-dark200_light800 ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`cursor-pointer ${pageNumber > 1 ? " " : "hidden"}`}
              onClick={() =>
                pageNumber == 1 ? null : handleNavigation("prev")
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
                <p className="body-semibold text-light-900">{pageNumber}</p>
              </div>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${!isNext ? " hidden" : " "}`}
              onClick={() => (isNext ? handleNavigation("next") : null)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Custom_pagination;
