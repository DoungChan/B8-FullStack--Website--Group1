import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "public/logo.png";

const Login = () => {
  return (
    <div className="flex  min-h-screen  flex-col items-center p-20 self-center ">
      <Image src={logo} width={270} alt="PromoKH" /> 
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
      <Link href={'/unauthorized'}>
      <button class=" bg-primary hover:bg-blue-700 text-white  py-2 px-5 rounded-lg mt-8 font-normal w-60 ">
        Login
      </button></Link>
      <div className=" text-gray-500 text-xs mt-2 ">
        Dont have an account? Sign up
      </div>
    </div>
  );
}

export default Login;
