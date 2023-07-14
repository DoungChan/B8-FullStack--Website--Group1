"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";
import Pagination from "react-js-pagination";
import { promotionsAtom } from "@/state/recoilAtoms";

const CustomPagination = ({ resPerPage, promotionsCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page); 

  let queryParams;

  const handlePageChange = (currentPage) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", String(currentPage)); // Subtract 1 to convert one-based to zero-based
      } else {
        queryParams.append("page", String(currentPage)); // Subtract 1 to convert one-based to zero-based
      }

      const path = window.location.pathname + "?" + queryParams.toString();

      router.push(path);
    }
  };

  return (
    <div className="flex my-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={promotionsCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        itemClass="relative inline-flex items-center border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-primary hover:text-white"
        activeLinkClassName="z-0 inline-flex items-center border border-primary bg-primary text-sm font-medium text-white"
        activeClass="z-0 inline-flex items-center border border-primary bg-primary text-sm font-medium text-white"
      />
    </div>
  );
};

export default CustomPagination;
