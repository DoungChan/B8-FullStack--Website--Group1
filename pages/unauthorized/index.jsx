import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UnauthorizeComponent = () => {
  const [countDown, setCountDown] = React.useState(5); // 3 seconds
  const router = useRouter();
  useEffect(() => {
    // time out to home page
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    // count down
    const countdownInterval = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Unauthorize | PromoKh </title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className=" flex min-h-screen flex-col items-center justify-center self-center p-20">
        <div className=" text-black font-bold">
          Oops! you need to login first 🙏
        </div>
        <div className=" items-center justify-center flex flex-col  ">
          <Link href="/">
            <button class=" bg-primary hover:bg-blue-700 text-white  py-3 px-5 rounded-lg mt-5 font-medium ">
              Back to Home Page 🏠 ({countDown})
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UnauthorizeComponent;
