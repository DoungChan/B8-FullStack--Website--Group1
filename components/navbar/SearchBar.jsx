import React from "react";
import Image from "next/image";
import search from "public/search.svg";
const SearchBar = () => {
  return (
    <div className="lg:m-12 md:m-3 sm:m-2 justify-center ">
      <form>
        <div className="relative pt-2 text-sub_font_color mx-auto">
          <input
            type="search"
            id="default-search"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none lg:w-96 md:w-60 sm:w-40"
            placeholder="Search a Promotion"
            required
          />
          <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
            <Image src={search} className="lg:w-6 h-auto" alt="PromoKH" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
