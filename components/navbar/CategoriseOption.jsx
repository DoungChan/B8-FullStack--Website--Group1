import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import arrowdown from "public/arrow-down.svg";
function CategoriseOption() {
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
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              Travel
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
            >
              Food
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              Tech
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              Fashion
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              Automoative
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              Grocery
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriseOption;
