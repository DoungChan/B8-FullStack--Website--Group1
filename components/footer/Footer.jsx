import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary px-[48px] text-white">
      <div className="min-[480px]:flex justify-between py-[72px]">
        <div>
          <p className="font-bold">PromoKh</p>
          <p className="pt-2">
            provide users with a platform to explore and access the latest
            promotions and discounts
          </p>
          <br />
          <br />
          <br />
          
          <p>
            <a href="https://storyset.com/web">Web illustrations by Storyset</a>
          </p>
        </div>
        <div className="max-[480px]:mt-4">
          <div className="flex">
            <div className="mr-20">
              <p className="font-bold">Categories</p>
              <p className="pt-2">Food</p>
              <p className="pt-2">Travel</p>
              <p className="pt-2">Fashion</p>
              <p className="pt-2">Electronic</p>
            </div>
            <div className="">
              <p className="font-bold">Company</p>
              <p className="pt-2">About Us</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-white"></div>
      <div className="py-[24px]">
        <div className="flex justify-between">
          <p>@2023 PromoKh. All rights reserved</p>
          <div className="flex">
            <p className="mr-4">Privacy</p>
            <p>Terms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
