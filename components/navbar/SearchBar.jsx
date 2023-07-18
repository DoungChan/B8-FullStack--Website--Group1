import React from "react";
import Image from "next/image";
import search from "public/search.svg";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { searchAtom } from "@/state/recoilAtoms";
const SearchBar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useRecoilState(searchAtom);
  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Rest of your code
  };
  const handleFormSubmit = (e) => {
    handleSubmit(e);
    if (searchValue === "") {
      router.push(`whatNew`);
    } else {
      router.push(`/whatNew?search=${searchValue}`);
    }
  };

  const activeSearch = router.pathname === "/whatNew" ? true : false;
  const activeSearchHomePage = router.asPath === "/" ? true : false;

  return (
    <>
      {activeSearch || activeSearchHomePage ? (
        <div className="lg:m-12 md:m-3 sm:m-2 justify-center ">
          <form onSubmit={handleFormSubmit}>
            <div className="relative pt-2 text-sub_font_color mx-auto">
              <input
                type="search"
                id="default-search"
                onChange={handleChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none lg:w-96 md:w-60 sm:w-40"
                placeholder="Search a Promotion"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-4 mr-4"
              >
                <Image src={search} className="lg:w-6 h-auto" alt="PromoKH" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default SearchBar;
