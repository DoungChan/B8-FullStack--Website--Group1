import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
const PageNotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 Error | PromoKH</title>
        <meta name="description" content="PromoKH 404 Error" />
        <meta property="og:title" content="404 Error | PromoKH" />
      </Head>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center pt-20 h-full ">
        <div className="mx-10">
          <p className="text-[24px] font-bold md:text-left text-sub_font_color w-1/2">
            404 Error
          </p>
          <h1 className="text-[30px] lg:text-[56px] font-bold text-font_color mb-4">
            Page not found...
          </h1>
          <p className="md:text-left text-sub_font_color">
            Sorry, the page doesn&apos;t exist or was removed. We suggest you go
            back to the home page.
          </p>
          <button
            className="bg-primary text-white font-bold py-2 px-4 rounded-[8px] my-4"
            onClick={() => router.push("/")}
          >
            Back to home
          </button>
        </div>
        <div>
          <Image src="/404.png" width={500} height={500} />
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
