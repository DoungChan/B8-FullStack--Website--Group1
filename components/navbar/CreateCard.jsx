import React from "react";
import Image from "next/image";

import useComponentVisible from "../../utils/hooks";

const CreateCard = ({ icon1, title1, icon2, title2, handleClickOutside }) => {
  const ref = useComponentVisible(handleClickOutside);

  return (
    <div
      ref={ref}
      className="absolute right-0 z-10 w-[173px] mt-2 mr-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outbuttonne-none "
    >
      {" "}
      <ul className="">
        <button
          className="flex w-full justify-start items-center p-2"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
        >
          <Image src={icon1} className="w-4 h-4" alt="Love" />
          <p className="text-primary font-sans font-thin text-sm pl-2">
            {title1}
          </p>
        </button>
        <button
          className="flex w-full justify-start items-center p-2"
          role="menuitem"
          tabindex="-1"
          id="menu-item-1"
        >
          <Image src={icon2} className="w-4 h-4" alt="Love" />
          <p className="text-primary font-sans font-thin text-sm pl-2">
            {title2}
          </p>
        </button>
      </ul>
    </div>
  );
};

export default CreateCard;
