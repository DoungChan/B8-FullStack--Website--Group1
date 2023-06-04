import React from "react";
import Image from "next/image";

const NabarCard = ({ icon1, title1, icon2, title2 }) => {
  return (
    <div className="absolute right-0 z-10 w-[173px] mt-2 mr-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
      {" "}
      <ul className="">
        <li className="flex w-full justify-start items-center p-2">
          <Image src={icon1} className="w-4 h-4" alt="Love" />
          <a href="#" className="text-primary font-sans font-thin text-sm pl-2">
            {title1}
          </a>
        </li>
        <li className="flex w-full justify-start items-center p-2">
          <Image src={icon2} className="w-4 h-4" alt="Love" />
          <a href="#" className="text-primary font-sans font-thin text-sm pl-2">
            {title2}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NabarCard;
