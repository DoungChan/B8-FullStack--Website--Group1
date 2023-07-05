import React from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import logo from "public/logo.png";
import profile from "public/profile.svg";
import CategoriseOption from "./CategoriseOption";
import search from "public/search.svg";
import NabarCard from "./NabarCard";
import Link from "next/link";
import { profileCardAtom, ceateCardAtom } from "@/state/recoilAtoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();

  const [isCreateOpen, setIsCreateOpen] = useRecoilState(ceateCardAtom);
  const [isProfileOpen, setIsProfileOpen] = useRecoilState(profileCardAtom);

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

  const whatNewFocus = router.pathname === "/whatNew" ? true : false;
  return (
    <nav className="w-full top-0 bg-white fixed z-10 pb-3">
      <div className="flex items-center justify-between pr-8 w-full h-16 bg-transparent shadow-sm">
        <div className="relative flex items-start">
          <Link href="/">
            <Image src={logo} width={270} alt="PromoKH" />
          </Link>
        </div>

        <div className="hidden sm:inline md:flex md:space-x-4 justify-end items-center w-[500px]">
          <CategoriseOption onClick={() => handleClickOutside()} />
          <Link href="/whatNew">
            <button className="text-sub_font_color font-sans text-sm">
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
      <div className="sm:hidden mx-6 ">
        <form>
          <div className="relative flex justify-center pt-2 text-sub_font_color mx-4">
            <input
              type="search"
              id="default-search"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none w-full "
              placeholder="Search a Promotion"
              required
            />
            <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
              <Image src={search} className="lg:w-6 h-auto" alt="PromoKH" />
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
