import Link from "next/link";
import React from "react";

const UnauthorizeComponent = () => {
  return (
    <div className=" flex min-h-screen flex-col items-center self-center p-20">
      <div className=" text-black font-bold">
        Oops! you need to login first 🙏
      </div>
      <div className=" items-center justify-center flex flex-col  ">
        <Link href='/login/Login'>
          <button class=" bg-primary hover:bg-blue-700 text-white  py-3 px-5 rounded-lg mt-5 font-medium ">
            Login
          </button>
        </Link>
        <div className=" text-gray-500 text-sm mt-3 ">
          Dont have an account? Sign up
        </div>
      </div>
    </div>
  );
};

export default UnauthorizeComponent;
