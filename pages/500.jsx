import React from "react";
import Head from "next/head";
import Image from "next/image";
const InternalServerError = () => {
  return (
    <>
      <Head>
        <title>Internal Server Error | PromoKH</title>
        <link rel="icon" href="/icon.png" />
        <meta name="description" content="PromoKH 404 Error" />
        <meta property="og:title" content="404 Error | PromoKH" />
      </Head>
      <div className="flex flex-col-reverse justify-center pb-[122px] items-center h-full ">
        <div className="mx-10 text-center justify-center items-center ">
          <div>
            <Image
              src="/503 Error with a cute animal-pana 1.png"
              width={400}
              height={400}
              alt="404"
            />
          </div>
          <p className="text-[24px] font-bold md:text-left text-sub_font_color font-sans">
            Our Server is Feeling a Little Down
          </p>

          <p className="md:text-left text-sub_font_color font-sans">
            Please try again in a few moments. We&apos;ll be back in no time.
          </p>
        </div>
      </div>
    </>
  );
};

export default InternalServerError;
