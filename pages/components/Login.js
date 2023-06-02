import Image from "next/image";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div className="flex  min-h-screen  flex-col items-center p-20 self-center ">
      <Image
        className=" flex self-center "
        src="/public/Logo.png"
        width={100}
        height={30}
        alt="Picture of the author"
      />
      <div className=" text-black text-xl font-bold py-8 mr-24">
        Welcome, back
      </div>
      <form className=" flex flex-col">
        <input
          className=" border border-black text-font_color  shadow-inner rounded-md p-2 px-4 flex-1 mb-3 w-60 "
          id="email"
          type="email"
          aria-label="email address"
          placeholder="Email"
        />
        <input
          className=" border border-black text-font_color shadow-inner rounded-md p-2 px-4 flex-1 w-60 "
          id="password"
          type="password"
          aria-label="password"
          placeholder="Password"
        />
      </form>
      <button class=" bg-primary hover:bg-blue-700 text-white  py-2 px-5 rounded-lg mt-8 font-normal w-60 ">
        Login
      </button>
      <div className=" text-gray-500 text-xs mt-2 ">
        Dont have an account? Sign up
      </div>
    </div>
  );
}

export default Login;
