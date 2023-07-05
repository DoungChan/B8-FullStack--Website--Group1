import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import arrowdown from "public/arrow-down.svg";
import { useRouter } from "next/router";
import { categoryAtom, categoryHomeAtom } from "@/state/recoilAtoms";
import { atom, useRecoilState, useRecoilValue } from "recoil";

function CategoriseOption() {
  const router = useRouter();

  const categories = useRecoilValue(categoryHomeAtom);

  const [openCategory, setOpenCategory] = useState(false);
  const ref = useRef();
  useEffect(() => {
    // Function to handle clicks outside the component
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenCategory(false);
      }
    }

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={ref} className="relative inline-block text-left">
      <div className="relative flex items-center bg-transparent">
        <button
          type="button"
          className="inline-flex w-full h-[27px] justify-center items-center gap-x-1.5 rounded-md bg-transparent px-4 text-sm font-semibold text-sub_font_color active:ring-primary duration-300"
          id="menu-button"
          // set open
          onClick={() => setOpenCategory((prev) => !prev)}
        >
          Categories
          {!openCategory ? (
            <Image src={arrowdown} className="w-4 h-4" alt="arrowdown" />
          ) : (
            <Image src={arrowdown} className="w-4 h-4" alt="arrowdown" />
          )}
        </button>
      </div>

      {openCategory === true && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div
            className="py-1"
            role="none"
            onClick={() => setOpenCategory(false)}
          >
            {categories.map((category, index) => (
              <a
                key={index}
                onClick={() => router.push(`/category/${category.id}`)}
                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriseOption;
