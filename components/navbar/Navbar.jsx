import React from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import logo from "public/Logo.png";
import profile from "public/profile.svg";
import CategoriseOption from "./CategoriseOption";
import search from "public/search.svg";
import NabarCard from "./NabarCard";
import Link from "next/link";
import {
  profileCardAtom,
  ceateCardAtom,
  searchAtom,
} from "@/state/recoilAtoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();

  const [isCreateOpen, setIsCreateOpen] = useRecoilState(ceateCardAtom);
  const [isProfileOpen, setIsProfileOpen] = useRecoilState(profileCardAtom);
  const [searchValue, setSearchValue] = useRecoilState(searchAtom);

  const handleClickProfileOpen = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCreateOpen(false);
  };

  const handleClickCreateOpen = () => {
    setIsCreateOpen(!isCreateOpen);
    setIsProfileOpen(false);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
    setIsProfileOpen(false);
  };
  // search on phone screen
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
      router.push(`whatNew?search=${searchValue}`);
    }
  };

  const activeSearch = router.pathname === "/whatNew" ? true : false;
  const activeSearchHomePage = router.asPath === "/" ? true : false;
  const whatNewFocus = router.pathname === "/whatNew" ? true : false;
  return (
    <nav className="w-full top-0 bg-white fixed z-10 pb-3">
      <div className="flex items-center justify-around sm:justify-between pr-8 w-full h-16 bg-transparent shadow-sm">
        <div className="relative flex items-start pl-6">
          <Link href="/">
            <Image
              src={logo}
              width={150}
              alt="PromoKH"
              className="hidden sm:inline"
            />
          </Link>
          <Link href="/">
            <Image
              src={"/logophone.png"}
              width={100}
              height={100}
              alt="PromoKH"
              className="sm:hidden"
            />
          </Link>
        </div>

        <div className="sm:inline md:flex md:space-x-4 sm:justify-end items-center w-[500px]  ">
          <div className="hidden sm:inline ">
            <CategoriseOption onClick={() => handleClickOutside()} />
          </div>
          <Link href="/whatNew">
            <button className="text-sub_font_color font-sans text-sm  justify-end ml-8">
              <span className={`flex-1 ${whatNewFocus ? "text-primary" : ""}`}>
                What&apos;s New
              </span>
            </button>
          </Link>
        </div>

        <div className="flex justify-end items-center ml-aut w-full">
          <div className="hidden sm:inline mb-2">
            <SearchBar />
          </div>
          <div className="relative inline-block text-sm">
            <button className="relative flex justify-center items-center sm:[25px] sm:h-[25px] w-[33px] h-[33px] ">
              <Image
                src={profile}
                width={33}
                height={33}
                alt="Profile"
                onClick={() => handleClickProfileOpen()}
              />
            </button>

            {isProfileOpen && (
              <NabarCard handleClickOutside={handleCloseCreate} />
            )}
          </div>

          <div className="relative inline-block text-sub_font_color font-sans text-sm">
            <button
              className="relative flex text-secondary justify-center items-center font-sans text-sm sm:text-xs md:text-xs lg:text-base sm:w-16 md:w-16 lg:w-28 h-9 sm:h-11 bg-primary rounded-md px-2 ml-3 md:ml-3 whitespace-nowrap"
              onClick={() => router.push("/formCreatePromotion")}
            >
              + Create
            </button>
          </div>
        </div>
      </div>
      {/* search on phone screen */}
      {activeSearchHomePage || activeSearch ? (
        <div className="sm:hidden mx-6 ">
          <form onSubmit={handleFormSubmit}>
            <div className="relative flex justify-center pt-2 text-sub_font_color mx-4">
              <input
                type="search"
                id="default-search"
                onChange={handleChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none w-full "
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
        <></>
      )}
    </nav>
  );
};

export default Navbar;
