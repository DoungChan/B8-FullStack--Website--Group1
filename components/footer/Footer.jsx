import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { categoryHomeAtom } from "@/state/recoilAtoms";
import Link from "next/link";

const Footer = () => {
  const categories = useRecoilValue(categoryHomeAtom);

  return (
    <div className="bg-primary px-[48px] text-white">
      <div className="min-[480px]:flex justify-between py-[72px]">
        <div>
          <p className="font-bold">PromoKh</p>
          <p className="pt-2">
            provide users with a platform to explore and access the latest
            <br />
            promotions and discounts on a wide range of products available in
            Cambodia
          </p>
        </div>
        <div className="max-[480px]:mt-4">
          <div className="flex">
            <div className="mr-20">
              <p className="font-bold">Categories</p>
              {categories.map((category) => (
                <Link href={`/category/${category.id}`} key={category.id}>
                  <p className="pt-2 hover:underline cursor-pointer">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mr-20">
              <p className="font-bold">About Us</p>
              <Link href="/aboutUs">
                <p className="pt-2 hover:underline cursor-pointer">
                  Bootcamp Group 1
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-white"></div>
      <div className="py-[24px]">
        <div className="flex justify-between">
          <p>&copy;2023 PromoKh. All rights reserved</p>
          <div className="flex">
            <Link href="/policy">
              <p className="mr-4 hover:underline cursor-pointer">Privacy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
