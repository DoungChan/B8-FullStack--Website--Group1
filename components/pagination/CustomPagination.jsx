"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";
import Pagination from "react-js-pagination";
import { promotionsAtom } from "@/state/recoilAtoms";

const CustomPagination = ({ resPerPage, promotionsCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 0;
  page = Number(page) + 1; // Add 1 to convert zero-based to one-based

  let queryParams;

  const handlePageChange = (currentPage) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", String(currentPage - 1)); // Subtract 1 to convert one-based to zero-based
      } else {
        queryParams.append("page", String(currentPage - 1)); // Subtract 1 to convert one-based to zero-based
      }

      const path = window.location.pathname + "?" + queryParams.toString();

      router.push(path);
    }
  };

  return (
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={promotionsCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        itemClass="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        activeLinkClassName="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
        activeClass="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
      />
    </div>
  );
};

export default CustomPagination;
