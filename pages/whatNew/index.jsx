import Link from "next/link";
import React from "react";
import PromotionCard from "@/components/popular/PromotionCard";
import { Promotions } from "@/components/popular/Promotions";

const WhatNew = () => {
  return (
    <div className="m-4 flex justify-center">
      <div>
        <h1 className="my-8 text-2xl font-bold text-font_color">What's new</h1>
        <div>
          <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
            {Promotions.map((promotion, index) => {
              return <PromotionCard promotion={promotion} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatNew;
