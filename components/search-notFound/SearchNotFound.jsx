import React from "react";
import Image from "next/image";
export const SearchNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center sm:pt-20 h-full ">
      <div className="mx-10">
        <h1 className="text-[30px] lg:text-[56px] font-bold text-font_color font-sans mb-4">
          No results found...
        </h1>
        <p className="md:text-left text-sub_font_color">
          We Coundn&apos;t find what you search for. Try searching again.
        </p>
      </div>
      <div>
        <Image
          src="/Mobile browsers-bro 1.png"
          width={500}
          height={500}
          alt="404"
        />
      </div>
    </div>
  );
};
