import React from "react";
import Image from "next/image";
import SignUpModal from "../modal/SignUp";
import Login from "../modal/Login";
import useComponentVisible from "../../utils/hooks";

const NabarCard = ({ handleClickOutside }) => {
  const ref = useComponentVisible(handleClickOutside);
  return (
    <div
      ref={ref}
      className="absolute right-0 z-10 w-[173px] mt-2 mr-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none "
    >
      {" "}
      <ul className="">
        <Login />
        <SignUpModal />
      </ul>
    </div>
  );
};

export default NabarCard;
